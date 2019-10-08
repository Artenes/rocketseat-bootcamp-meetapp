import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';
import SessionStoreRequest from '../requests/SessionStoreRequest';

/**
 * Controls the authentication of users.
 */
class SessionController {
  /**
   * Create a new token for authentication.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async store(req, res) {
    const { email = null } = req.body;

    const user = await User.findOne({ where: { email } });

    const { error, status } = await new SessionStoreRequest(
      req,
      user
    ).isValid();

    if (error) {
      return res.status(status).json({ error });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token, user: { name, email } });
  }
}

export default new SessionController();
