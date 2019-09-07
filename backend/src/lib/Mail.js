import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

/**
 * Class to manage mails
 */
class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // auth can be null if mail strategy does not use it
      auth: auth.user ? auth : null,
    });
  }

  /**
   * Send an email with the provided configuration.
   *
   * @param {Object} message
   */
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
