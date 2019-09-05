import { parseISO, isBefore } from 'date-fns';
import File from '../models/File';
import validationSchema from '../schemas/StoreMeetupSchema';
import { badRequest } from './responses';

/**
 * Validates a request to create a meetup
 */
class MeetupStoreRequest {
  /**
   * Validates the given request.
   *
   * @param {Object} request the request to validate.
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid(request) {
    this.body = request.body;

    if (await this.isSchemaInvalid()) {
      return badRequest('Invalid data provided');
    }

    if (await this.imageDoesNotExists()) {
      return badRequest('Image not found');
    }

    if (await this.isDateInPast()) {
      return badRequest('Field date must be after today');
    }

    return true;
  }

  async isSchemaInvalid() {
    return !validationSchema.isValid(this.body);
  }

  async imageDoesNotExists() {
    return !File.findByPk(this.body.image_id);
  }

  async isDateInPast() {
    const parsedDate = parseISO(this.body.date);
    const now = new Date();
    return isBefore(parsedDate, now);
  }
}

export default new MeetupStoreRequest();
