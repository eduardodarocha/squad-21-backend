import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', ensureAuthenticated, projectsController.create);
projectsRouter.get(
  '/by-user',
  ensureAuthenticated,
  projectsController.showByUser,
);
projectsRouter.get('/all', ensureAuthenticated, projectsController.showAll);
projectsRouter.get(
  '/by-project/:id',
  ensureAuthenticated,
  projectsController.show,
);

export default projectsRouter;
