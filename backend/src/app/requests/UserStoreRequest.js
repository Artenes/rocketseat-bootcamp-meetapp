import * as Yup from 'yup';
import { badRequest } from './responses';
import User from '../models/User';

/**
 * Validates a request to create a user.
 */
class UserStoreRequest {
  /**
   * @param {Object} request
   */
  constructor(request) {
    this.request = request;
    this.schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
    if (await this.isSchemaInvalid()) {
      return badRequest('Dados inválidos');
    }

    if (await this.isEmailInUse()) {
      return badRequest('E-mail já em uso');
    }

    return true;
  }

  async isSchemaInvalid() {
    return !(await this.schema.isValid(this.request.body));
  }

  async isEmailInUse() {
    return User.findOne({ where: { email: this.request.body.email } });
  }
}

export default UserStoreRequest;
