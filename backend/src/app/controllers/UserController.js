import updateUserSchema from '../schemas/UpdateUserSchema';
import User from '../models/User';
import UserStoreRequest from '../requests/UserStoreRequest';

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

  async update(req, res) {
    const isSchemaValid = await updateUserSchema.isValid(req.body);
    if (!isSchemaValid) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword) {
      const passwordValid = await user.checkPassword(oldPassword);
      if (oldPassword && !passwordValid) {
        return res.status(401).json({ error: 'Password does not match' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
