import { Op } from 'sequelize';
import RegistrationStoreRequest from '../requests/RegistrationStoreRequest';
import Registration from '../models/Registration';
import User from '../models/User';
import Meetup from '../models/Meetup';
import Mail from '../../lib/Mail';
import File from '../models/File';

/**
 * Controller for managing registrations.
 * Registration is when a user decides to take part in a meetup.
 */
class RegistrationController {
  /**
   * Lists all meetups the user took part.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async index(req, res) {
    const registrations = await Registration.findAll({
      include: [
        {
          model: Meetup,
          where: { date: { [Op.gt]: new Date() } },
          required: true,
          include: [{ model: File, as: 'banner' }],
        },
      ],
      order: [[Meetup, 'date']],
    });

    // retarded solution just to make banner points to url
    const meetups = registrations.map(registration => {
      const {
        id,
        title,
        description,
        localization,
        date,
        banner,
      } = registration.Meetup;

      return {
        id,
        title,
        description,
        localization,
        date,
        banner: banner.url,
      };
    });

    return res.json(meetups);
  }

  /**
   * Creates a registration.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.body.meetup_id, {
      include: [{ model: User, as: 'organizer' }],
    });

    const { error, status } = await new RegistrationStoreRequest(
      user,
      req,
      meetup
    ).isValid();

    if (error) {
      return res.status(status).json({ error });
    }

    await Registration.create({ meetup_id: meetup.id, user_id: user.id });

    // notifies the organizer of the new attendant.
    Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `${user.name} registered for ${meetup.title}`,
      template: 'new_registration',
      context: {
        organizer: meetup.organizer,
        meetup,
        attendant: user,
      },
    });

    return res.sendStatus(201);
  }
}

export default new RegistrationController();