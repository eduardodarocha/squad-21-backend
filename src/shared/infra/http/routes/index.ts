import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
