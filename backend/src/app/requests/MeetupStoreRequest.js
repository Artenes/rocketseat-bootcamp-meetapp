import * as Yup from 'yup';
import { parseISO, isAfter } from 'date-fns';
import File from '../models/File';

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  image_id: Yup.number().required(),
});

class MeetupStoreRequest {
  async isValid(request) {
    this.body = request.body;

    if (!(await this.isSchemaValid())) {
      return this.error('Invalid data provided');
    }

    if (!(await this.doesImageExists())) {
      return this.error(`Image with id ${this.body.image_id} does not exists`);
    }

    if (!this.isGoingToHappen()) {
      return this.error('Field date must be after today');
    }

    return true;
  }

  async isSchemaValid() {
    return validationSchema.isValid(this.body);
  }

  async doesImageExists() {
    return File.findByPk(this.body.image_id);
  }

  isGoingToHappen() {
    const date = parseISO(this.body.date);
    const now = new Date();
    return isAfter(date, now);
  }

  error(message) {
    return { status: 400, error: message, isValid: false };
  }
}

export default new MeetupStoreRequest();
