import MeetupStoreRequest from '../requests/MeetupStoreRequest';

class MeetupController {
  async store(req, res) {
    const { error, status } = await MeetupStoreRequest.isValid(req);
    if (error) {
      return res.status(status).json({ error });
    }

    return res.json(req.body);
  }
}

export default new MeetupController();
