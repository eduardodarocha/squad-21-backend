import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../../controllers/users/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', ensureAuthenticated, usersController.create);

usersRouter.get('/me', ensureAuthenticated, usersController.showMe);

export default usersRouter;
