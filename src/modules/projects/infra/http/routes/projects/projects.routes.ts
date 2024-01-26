import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../../controllers/projects/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post('/', ensureAuthenticated, projectsController.create); // POST do Project

projectsRouter.get('/:id', ensureAuthenticated, projectsController.showMe); // GET do Project

export default projectsRouter;
