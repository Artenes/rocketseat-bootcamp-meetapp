import { badRequest } from './responses';

const validMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

/**
 * Validates a request to upload a file.
 */
class FileStoreRequest {
  /**
   * @param {Object} request
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * Validates the given request.
   *
   * @return {Object|boolean} an error object or true if it is valid.
   */
  async isValid() {
    if (await this.isFileNotPresent()) {
      return badRequest('Field file is required');
    }

    if (await this.isFileMoreThan4Mb()) {
      return badRequest('File cannot be more than 4MB');
    }

    if (await this.isFileNotAnImage()) {
      return badRequest('File must be either a jpg or png file');
    }

    return true;
  }

  async isFileNotPresent() {
    return !this.request.file;
  }

  async isFileMoreThan4Mb() {
    return this.request.file.size > 4000000;
  }

  async isFileNotAnImage() {
    return !validMimeTypes.find(type => type === this.request.file.mimetype);
  }
}

export default FileStoreRequest;
