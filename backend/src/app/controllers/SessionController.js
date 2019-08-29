import jwt from 'jsonwebtoken';

import User from '../models/User';
import createSessionSchema from '../schemas/CreateSessionSchema';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const isValid = await createSessionSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: { id, name, email },
      token,
    });
  }
}

export default new SessionController();
