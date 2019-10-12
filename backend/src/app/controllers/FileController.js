import fileSystem from 'fs';
import FileStoreRequest from '../requests/FileStoreRequest';
import File from '../models/File';

/**
 * Controls the upload of files.
 */
class FileController {
  /**
   * Save a file's information in the database.
   * And do any clean up in case the request is invalid.
   *
   * @param {Object} req the incoming request.
   * @param {Object} res the outgoing response.
   */
  async store(req, res) {
    const { status, error } = await new FileStoreRequest(req).isValid();
    if (error) {
      // if something went wrong, delete the uploaded file
      if (req.file) {
        try {
          fileSystem.unlinkSync(req.file.path);
        } catch (exception) {
          // just ignore the error.
        }
      }
      return res.status(status).json({ error });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    return res.status(201).json({
      id: file.id,
      url: file.url,
    });
  }
}

export default new FileController();
