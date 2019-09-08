import { badRequest, unauthorized, notFound } from './responses';

/**
 * Validates a request to delete a meetup
 */
class MeetupDeleteRequest {
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
      return badRequest('Cannot cancel past meetups');
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
}

export default MeetupDeleteRequest;
