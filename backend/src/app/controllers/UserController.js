import User from '../models/User';
import UserStoreRequest from '../requests/UserStoreRequest';
import UserUpdateRequest from '../requests/UserUpdateRequest';

/**
 * Controlls user data.
 */
class UserController {
  /**
   * Saves a user in the database.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async store(req, res) {
    const { error, status } = await new UserStoreRequest(req).isValid();
    if (error) {
      return res.status(status).json({ error });
    }

    await User.create(req.body);

    return res.sendStatus(201);
  }

  /**
   * Updates the logged user information.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async update(req, res) {
    const user = await User.findByPk(req.userId);

    const { error, status } = await new UserUpdateRequest(req, user).isValid();
    if (error) {
      return res.status(status).json({ error });
    }

    await user.update(req.body);

    return res.send();
  }
}

export default new UserController();
