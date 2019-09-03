import FileStoreRequest from '../requests/FileStoreRequest';

class FileController {
  async store(req, res) {
    const { status, error } = FileStoreRequest.isValid(req);
    if (error) {
      return res.status(status).json({ error });
    }

    const { originalname: name, filename: path } = req.file;

    return res.json({ name, path });
  }
}

export default new FileController();
