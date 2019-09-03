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
    this.server.use('/files', express.static(multerConfig.destination));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
