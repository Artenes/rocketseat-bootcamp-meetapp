class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    return res.json({
      name,
      email,
      password,
    });
  }
}

export default new UserController();
