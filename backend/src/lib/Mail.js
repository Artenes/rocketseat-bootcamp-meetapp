import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
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

    this.configureTemplates();
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

  /**
   * Configure template engine to render emails.
   */
  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    const layoutsDir = resolve(viewPath, 'layouts');
    const partialsDir = resolve(viewPath, 'partials');
    const defaultLayout = 'default';
    const extname = '.hbs';

    const viewEngine = exphbs.create({
      layoutsDir,
      partialsDir,
      defaultLayout,
      extname,
    });

    const templateConfig = nodemailerhbs({
      viewEngine,
      viewPath,
      extName: extname,
    });

    this.transporter.use('compile', templateConfig);
  }
}

export default new Mail();
