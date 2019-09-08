import MeetupStoreRequest from '../requests/MeetupStoreRequest';
import MeetupUpdateRequest from '../requests/MeetupUpdateRequest';
import MeetupDeleteRequest from '../requests/MeetupDeleteRequest';
import Meetup from '../models/Meetup';
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
    const { error, status } = await MeetupUpdateRequest.isValid(req);
    if (error) {
      return res.status(status).json({ error });
    }

    /**
     * The request can has an arbitrary number of fields to update.
     * To avoid setting to null any field that was not provided,
     * we set the default value of each one to the value
     * stored in the database prior to the update.
     */
    const meetup = await Meetup.findByPk(req.params.id);
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
    const { error, status } = await MeetupDeleteRequest.isValid(req);
    if (error) {
      return res.status(status).json({ error });
    }

    const meetup = await Meetup.findByPk(req.params.id);
    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
