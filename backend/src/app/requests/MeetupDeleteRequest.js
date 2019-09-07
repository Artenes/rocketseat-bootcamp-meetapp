import { isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import { badRequest, unauthorized, notFound } from './responses';

/**
 * Validates a request to delete a meetup
 */
class MeetupDeleteRequest {
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
      return badRequest('Cannot cancel past meetups');
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
}

export default new MeetupDeleteRequest();
