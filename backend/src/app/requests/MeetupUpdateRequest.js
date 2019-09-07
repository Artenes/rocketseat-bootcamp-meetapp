import { parseISO, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';
import validationSchema from '../schemas/UpdateMeetupSchema';
import { badRequest, unauthorized, notFound } from './responses';

/**
 * Validates a request to update a meetup
 */
class MeetupUpdateRequest {
  /**
   * Validates the given request.
   *
   * @param {Object} request the request to validate.
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid(request) {
    this.request = request;
    this.meetup = await Meetup.findByPk(request.params.id);

    if (await this.meetupDoesNotExists()) {
      return notFound('Meetup not found');
    }

    if (await this.doesNotBelongsToUser()) {
      return unauthorized('Meetup not found');
    }

    if (await this.isMeetupInPast()) {
      return badRequest('Cannot edit past meetups');
    }

    if (await this.isSchemaInvalid()) {
      return badRequest('Invalid data provided');
    }

    if (await this.isDateInPast()) {
      return badRequest('Field date must be after today');
    }

    if (await this.imageDoesNotExists()) {
      return badRequest('Image not found');
    }

    return true;
  }

  async meetupDoesNotExists() {
    return !this.meetup;
  }

  async doesNotBelongsToUser() {
    return this.meetup.user_id !== this.request.userId;
  }

  async isMeetupInPast() {
    const now = new Date();
    return isBefore(this.meetup.date, now);
  }

  async isSchemaInvalid() {
    return !(await validationSchema.isValid(this.request.body));
  }

  async isDateInPast() {
    const { date } = this.request.body;
    const parsedDate = parseISO(date);
    const now = new Date();
    return date && isBefore(parsedDate, now);
  }

  async imageDoesNotExists() {
    const { image_id } = this.request.body;
    return image_id && !File.findByPk(image_id);
  }
}

export default new MeetupUpdateRequest();
