import MeetupStoreRequest from '../requests/MeetupStoreRequest';
import MeetupUpdateRequest from '../requests/MeetupUpdateRequest';
import MeetupDeleteRequest from '../requests/MeetupDeleteRequest';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

/**
 * Manages meetups created by the logged user.
 */
class MeetupController {
  /**
   * Lists all meetups created by the current user.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async index(req, res) {
    const rawMeetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      include: [{ model: File, as: 'banner', attributes: ['path', 'url'] }],
    });

    const meetups = rawMeetups.map(meetup => {
      const { id, title, description, localization, date, banner } = meetup;

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
   * Creates a meetup.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async store(req, res) {
    const { error, status } = await new MeetupStoreRequest(req).isValid();
    if (error) {
      return res.status(status).json({ error });
    }

    const { title, description, localization, date, image_id } = req.body;

    await Meetup.create({
      title,
      description,
      localization,
      date,
      image_id,
      user_id: req.userId,
    });

    return res.sendStatus(201);
  }

  /**
   * Updates a meetup.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async update(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.id);

    const { error, status } = await new MeetupUpdateRequest(
      user,
      req,
      meetup
    ).isValid();
    if (error) {
      return res.status(status).json({ error });
    }

    /**
     * If we do meetup.update(req.body),
     * the client can change the user_id,
     * to avoid this we extract only
     * the fields we need, passing a default
     * value to it if not provided.
     */
    const {
      title = meetup.title,
      description = meetup.description,
      localization = meetup.localization,
      date = meetup.date,
      image_id = meetup.image_id,
    } = req.body;

    meetup.update({
      title,
      description,
      localization,
      date,
      image_id,
    });

    return res.send();
  }

  /**
   * Updates a meetup.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.id);

    const { error, status } = await new MeetupDeleteRequest(
      user,
      req,
      meetup
    ).isValid();

    if (error) {
      return res.status(status).json({ error });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
