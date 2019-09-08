import { parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';

import File from '../models/File';
import { badRequest } from './responses';

/**
 * Validates a request to create a meetup
 */
class MeetupStoreRequest {
  /**
   * @param {Object} request
   */
  constructor(request) {
    this.request = request;
    this.schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      image_id: Yup.number().required(),
    });
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
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
    return !(await this.schema.isValid(this.request.body));
  }

  async imageDoesNotExists() {
    return !(await File.findByPk(this.request.body.image_id));
  }

  async isDateInPast() {
    const parsedDate = parseISO(this.request.body.date);
    const now = new Date();
    return isBefore(parsedDate, now);
  }
}

export default MeetupStoreRequest;
