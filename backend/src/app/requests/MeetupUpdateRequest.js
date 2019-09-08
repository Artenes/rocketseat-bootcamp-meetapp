import { parseISO, isBefore } from 'date-fns';
import File from '../models/File';
import validationSchema from '../schemas/UpdateMeetupSchema';
import { badRequest, unauthorized, notFound } from './responses';

/**
 * Validates a request to update a meetup
 */
class MeetupUpdateRequest {
  /**
   * @param {User} user
   * @param {Object} request
   * @param {Meetup} meetup
   */
  constructor(user, request, meetup) {
    this.user = user;
    this.request = request;
    this.meetup = meetup;
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
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
    return !this.meetup.isOrganizedBy(this.user);
  }

  async isMeetupInPast() {
    return this.meetup.hasPassed();
  }

  async isSchemaInvalid() {
    return !(await validationSchema.isValid(this.request.body));
  }

  async isDateInPast() {
    const date = parseISO(this.request.body.date);
    const now = new Date();
    return date && isBefore(date, now);
  }

  async imageDoesNotExists() {
    const { image_id } = this.request.body;
    return image_id && !(await File.findByPk(image_id));
  }
}

export default MeetupUpdateRequest;
