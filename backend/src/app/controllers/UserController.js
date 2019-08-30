import createUserSchema from '../schemas/CreateUserSchema';
import updateUserSchema from '../schemas/UpdateUserSchema';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const isSchemaValid = await createUserSchema.isValid(req.body);
    if (!isSchemaValid) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
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
