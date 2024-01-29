import { Router } from 'express';
import multer from 'multer';

import projectsUpload from '@config/projectsUpload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();

const projectsController = new ProjectsController();

const upload = multer(projectsUpload.multer);

projectsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('file'),
  projectsController.create,
);
projectsRouter.get(
  '/by-user',
  ensureAuthenticated,
  projectsController.showByUser,
);
projectsRouter.get('/', ensureAuthenticated, projectsController.showAll);
projectsRouter.get(
  '/by-project/:id',
  ensureAuthenticated,
  projectsController.show,
);
projectsRouter.put(
  '/:id',
  ensureAuthenticated,
  upload.single('file'),
  projectsController.update,
);
projectsRouter.delete('/:id', ensureAuthenticated, projectsController.delete);

export default projectsRouter;
