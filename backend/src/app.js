import express from 'express';
import routes from './routes';

import multerConfig from './config/multer';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // creates route to serve static files
    // when a file is not found, it will throw a 404 error
    // instead of just passing down the request
    // this option is not valid if we have multiple
    // calls to express.static that sets multiples dirs
    // to be looked up for static files.
    const throwErrors = { fallthrough: false };
    this.server.use(
      '/files',
      express.static(multerConfig.destination, throwErrors)
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
