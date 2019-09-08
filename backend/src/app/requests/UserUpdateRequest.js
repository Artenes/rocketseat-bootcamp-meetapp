import * as Yup from 'yup';
import { badRequest, unauthorized } from './responses';
import User from '../models/User';

/**
 * Validates a request to update a user.
 */
class UserUpdateRequest {
  /**
   * @param {Object} request
   * @param {User} request
   */
  constructor(request, user) {
    this.request = request;
    this.user = user;

    const makesPasswordRequired = (oldPassword, field) =>
      oldPassword ? field.required() : field;

    const makesConfirmPasswordRequired = (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field;

    this.schema = Yup.object().shape({
      name: Yup.string().min(1),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', makesPasswordRequired),
      confirmPassword: Yup.string().when(
        'password',
        makesConfirmPasswordRequired
      ),
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

    if (await this.isEmailInUse()) {
      return badRequest('User already exists');
    }

    if (await this.oldPasswordMissing()) {
      return badRequest('Field oldPassword is required to change password');
    }

    if (await this.confirmPasswordMissing()) {
      return badRequest('Field confirmPassword is required to change password');
    }

    if (await this.isPasswordInvalid()) {
      return unauthorized('Password does not match');
    }

    return true;
  }

  async isSchemaInvalid() {
    return !(await this.schema.isValid(this.request.body));
  }

  async isEmailInUse() {
    return (
      this.request.body.email &&
      this.user.email !== this.request.body.email &&
      User.findOne({ where: { email: this.request.body.email } })
    );
  }

  async isPasswordInvalid() {
    return (
      this.request.body.oldPassword &&
      !(await this.user.checkPassword(this.request.body.oldPassword))
    );
  }

  async oldPasswordMissing() {
    return this.request.body.password && !this.request.body.oldPassword;
  }

  async confirmPasswordMissing() {
    return this.request.body.password && !this.request.body.confirmPassword;
  }
}

export default UserUpdateRequest;
