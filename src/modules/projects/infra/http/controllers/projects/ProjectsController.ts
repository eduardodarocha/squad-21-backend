import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindProjectService from '@modules/projects/services/projects/FindProjectService';
import CreateProjectService from '@modules/projects/services/projects/CreateProjectService';

export default class projectsController {
  public async showMe(request: Request, response: Response): Promise<Response> {
    const { project } = request;

    const findProjectService = container.resolve(FindProjectService);

    const projectFound = await findProjectService.execute({
      id: project.id,
    });

    return response.json(projectFound);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, tags, link, description, image } = request.body;

    const createProjectService = container.resolve(CreateProjectService);

    const newProject = await createProjectService.execute({
      title,
      tags,
      link,
      description,
      image,
    });

    return response.status(201).json(newProject);
  }
}
