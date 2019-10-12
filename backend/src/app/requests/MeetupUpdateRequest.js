import { parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';
import File from '../models/File';
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

    this.schema = Yup.object().shape({
      // min set to enforce that the string should not be empty
      title: Yup.string().min(1),
      description: Yup.string().min(1),
      localization: Yup.string().min(1),
      date: Yup.date(),
      image_id: Yup.number().min(1),
    });
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
    if (await this.meetupDoesNotExists()) {
      return notFound('Meetup não encontrado');
    }

    if (await this.doesNotBelongsToUser()) {
      return unauthorized('Meetup não encontrado');
    }

    if (await this.isMeetupInPast()) {
      return badRequest('Não é possível editar meetups passadas');
    }

    if (await this.isSchemaInvalid()) {
      return badRequest('Data inválida');
    }

    if (await this.isDateInPast()) {
      return badRequest('Data precisa ser depois de hoje');
    }

    if (await this.imageDoesNotExists()) {
      return badRequest('Imagem não encontrada');
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
    return !(await this.schema.isValid(this.request.body));
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
