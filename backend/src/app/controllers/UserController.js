import createUserSchema from '../schemas/CreateUserSchema';

class UserController {
  async store(req, res) {
    const isValid = await createUserSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password } = req.body;

    return res.json({
      name,
      email,
      password,
    });
  }
}

export default new UserController();
