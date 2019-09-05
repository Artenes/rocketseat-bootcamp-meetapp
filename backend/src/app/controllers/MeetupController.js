import MeetupStoreRequest from '../requests/MeetupStoreRequest';
import MeetupUpdateRequest from '../requests/MeetupUpdateRequest';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const { error, status } = await MeetupStoreRequest.isValid(req);
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
}

export default new MeetupController();
