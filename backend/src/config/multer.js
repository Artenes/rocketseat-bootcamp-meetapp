import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

/**
 * Folder where uploaded files will be saved.
 */
const destination = resolve(__dirname, '..', '..', 'tmp', 'uploads');

/**
 * Changes the received file name to a random set of characters.
 */
function changeFileName(request, file, callback) {
  crypto.randomBytes(16, (error, newRandomName) => {
    if (error) {
      return callback(error);
    }

    const newFileName =
      newRandomName.toString('hex') + extname(file.originalname);

    return callback(null, newFileName);
  });
}

// creates diskStorage instance.
const storage = multer.diskStorage({
  destination,
  filename: changeFileName,
});

export default { storage };
