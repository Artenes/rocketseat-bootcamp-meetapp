import { isBefore } from 'date-fns';
import { notFound, badRequest, unauthorized } from './responses';
import Meetup from '../models/Meetup';
import Registration from '../models/Registration';

/**
 * Validates a request to create a registration.
 */
class RegistrationStoreRequest {
  /**
   * @param {User} user
   * @param {Object} request
   * @param {Meetup} meetup
   */
  constructor(user, request, meetup) {
    this.request = request;
    this.user = user;
    this.meetup = meetup;
  }

  /**
   * Validates the given request.
   *
   * @param {Object} request the request to validate.
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
    if (await this.meetupDoesNotExists()) {
      return notFound('Meetup não encontrada');
    }

    if (await this.belongsToUser()) {
      return unauthorized('Não é possível inscrever-se em sua própria meetup');
    }

    if (await this.isMeetupInPast()) {
      return badRequest('Não é possível inscrever-se em meetups passadas');
    }

    if (await this.isBusyAtTime()) {
      return badRequest(
        'Já inscrito em outro meetup que irá acontecer no mesmo horário'
      );
    }

    return true;
  }

  async meetupDoesNotExists() {
    return !this.meetup;
  }

  async belongsToUser() {
    return this.meetup.isOrganizedBy(this.user);
  }

  async isMeetupInPast() {
    const now = new Date();
    return isBefore(this.meetup.date, now);
  }

  async isBusyAtTime() {
    // this rule covers the case where the user tryes to register
    // again in the same meetup.
    const where = { user_id: this.user.id };
    const include = [
      {
        model: Meetup,
        required: true,
        where: { date: this.meetup.date },
      },
    ];
    return Registration.findOne({ where, include });
  }
}

export default RegistrationStoreRequest;
