import createUserSchema from '../schemas/CreateUserSchema';
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
}

export default new UserController();
