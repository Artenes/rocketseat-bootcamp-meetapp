import * as Yup from 'yup';
import { badRequest, unauthorized } from './responses';

/**
 * Validates a request to create a meetup
 */
class SessionStoreRequest {
  /**
   * @param {Object} request
   */
  constructor(request, user) {
    this.request = request;
    this.user = user;
    this.schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
    if (await this.isSchemaInvalid()) {
      return badRequest('Credenciais inválidas');
    }

    if (await this.userDoesNotExists()) {
      return badRequest('Usuário não encontrado');
    }

    if (await this.isPasswordInvalid()) {
      return unauthorized('Senha inválida');
    }

    return true;
  }

  async isSchemaInvalid() {
    return !(await this.schema.isValid(this.request.body));
  }

  async userDoesNotExists() {
    return !this.user;
  }

  async isPasswordInvalid() {
    return !(await this.user.checkPassword(this.request.body.password));
  }
}

export default SessionStoreRequest;
