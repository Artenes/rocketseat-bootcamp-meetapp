import MeetupStoreRequest from '../requests/MeetupStoreRequest';
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

    return res.send(201);
  }
}

export default new MeetupController();
