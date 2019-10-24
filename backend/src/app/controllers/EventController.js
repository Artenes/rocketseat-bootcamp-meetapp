import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

/**
 * Controls the listing of meetups for guests.
 */
class EventController {
  /**
   * Lists all meetups in the application.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async index(req, res) {
    const perPage = 10;
    const { page = 1, date: rawDate } = req.query;

    const where = {};

    /**
     * The date does not include hours,
     * so we have to calculate the interval
     * to fetch all meetups in that day.
     */
    if (rawDate) {
      const date = parseISO(rawDate);
      where.date = { [Op.between]: [startOfDay(date), endOfDay(date)] };
    }

    const rawMeetups = await Meetup.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      where,
      attributes: ['id', 'title', 'description', 'localization', 'date'],
      include: [
        { model: User, as: 'organizer', attributes: ['name', 'email'] },
        { model: File, as: 'banner', attributes: ['path', 'url'] },
      ],
      order: [['date', 'DESC']],
    });

    // retarded solution just to make banner points to an url
    const meetups = rawMeetups.map(meetup => {
      const {
        id,
        title,
        description,
        date,
        localization,
        organizer,
        banner,
      } = meetup;

      return {
        id,
        title,
        description,
        date,
        localization,
        organizer,
        banner: banner.url,
      };
    });

    return res.json(meetups);
  }
}

export default new EventController();
