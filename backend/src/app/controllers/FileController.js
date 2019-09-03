import fileSystem from 'fs';
import FileStoreRequest from '../requests/FileStoreRequest';
import File from '../models/File';

function deleteFileIfPresent(req) {
  if (req.file) {
    try {
      fileSystem.unlinkSync(req.file.path);
    } catch (error) {
      console.log(error);
    }
  }
}

class FileController {
  async store(req, res) {
    const { status, error } = FileStoreRequest.isValid(req);
    if (error) {
      // if something went wrong, delete the uploaded file
      deleteFileIfPresent(req);
      return res.status(status).json({ error });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.json(file);
  }
}

export default new FileController();
