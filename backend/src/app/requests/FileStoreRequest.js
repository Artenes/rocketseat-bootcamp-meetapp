const validMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

class FileStoreRequest {
  isValid(request) {
    this.request = request;

    if (!this.isFilePresent()) {
      return this.error('Field file is required');
    }

    if (!this.isFileLessThan4Mb()) {
      return this.error('File cannot be more than 4MB');
    }

    if (!this.isFileAnImage()) {
      return this.error('File must be either a jpg or png file');
    }

    return true;
  }

  isFilePresent() {
    return this.request.file;
  }

  isFileLessThan4Mb() {
    return this.request.file.size < 4000000;
  }

  isFileAnImage() {
    return validMimeTypes.find(type => type === this.request.file.mimetype);
  }

  error(message) {
    return { status: 400, error: message, isValid: false };
  }
}

export default new FileStoreRequest();
