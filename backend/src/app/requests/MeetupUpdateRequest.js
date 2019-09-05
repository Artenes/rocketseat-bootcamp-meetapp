import * as Yup from 'yup';
import { isAfter, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';

const validationSchema = Yup.object().shape({
  // min set to enforce that the string should not be empty
  title: Yup.string().min(1),
  description: Yup.string().min(1),
  localization: Yup.string().min(1),
  date: Yup.date(),
  // 0 is a falsy value, so avoid receiving it by setting min to 1
  image_id: Yup.number().min(1),
});

/**
 * Validates a request to update a meetup
 */
class MeetupUpdateRequest {
  async isValid(request) {
    this.request = request;

    this.meetup = await Meetup.findByPk(request.params.id);

    if (!this.doesMeetupExists()) {
      return this.error('Meetup not found');
    }

    if (!this.belongsToUser()) {
      return this.error('Meetup not found');
    }

    if (!this.isMeetupGoingToHappen()) {
      return this.error('Cannot edit past meetups');
    }

    if (!(await this.isSchemaValid())) {
      return this.error('Invalid data provided');
    }

    if (this.request.body.date && !this.isDateAfterToday()) {
      return this.error('Field date must be after today');
    }

    if (this.request.body.image_id && !(await this.doesImageExists())) {
      return this.error(
        `Image with id ${request.body.image_id} does not exists`
      );
    }

    return true;
  }

  async isSchemaValid() {
    return validationSchema.isValid(this.request.body);
  }

  doesMeetupExists() {
    return this.meetup;
  }

  isMeetupGoingToHappen() {
    const now = new Date();
    return isAfter(this.meetup.date, now);
  }

  belongsToUser() {
    return this.meetup.user_id === this.request.userId;
  }

  async doesImageExists() {
    return File.findByPk(this.request.body.image_id);
  }

  isDateAfterToday() {
    const date = parseISO(this.request.body.date);
    const now = new Date();
    return isAfter(date, now);
  }

  error(message) {
    return { status: 400, error: message, isValid: false };
  }
}

export default new MeetupUpdateRequest();
