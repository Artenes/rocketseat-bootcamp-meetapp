import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';
import MeetupController from './app/controllers/MeetupController';
import RegistrationController from './app/controllers/RegistrationController';
import EventController from './app/controllers/EventController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/events', EventController.index);

// protected routes
routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.delete('/registrations/:meetupid', RegistrationController.delete);

export default routes;
