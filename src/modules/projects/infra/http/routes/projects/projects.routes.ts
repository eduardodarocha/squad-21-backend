import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../../controllers/projects/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', ensureAuthenticated, projectsController.create);

projectsRouter.get('/me', ensureAuthenticated, projectsController.showMe);

export default projectsRouter;
