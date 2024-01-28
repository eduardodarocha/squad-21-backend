import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindProjectService from '@modules/projects/services/FindProjectService';
import FindProjectsByUserService from '@modules/projects/services/FindProjectsByUserService';
import FindAllProjectsService from '@modules/projects/services/FindAllProjectsService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';

export default class projectsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProjectService = container.resolve(FindProjectService);

    const projectFound = await findProjectService.execute({
      id,
    });

    return response.json(projectFound);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user } = request;
    const { search } = request.query;

    const findProjectsService = container.resolve(FindAllProjectsService);

    const projects = await findProjectsService.execute({
      userId: user.id,
      query: search,
    });

    return response.json(projects);
  }

  public async showByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user } = request;
    const { search } = request.query;

    const findProjectsByUserService = container.resolve(
      FindProjectsByUserService,
    );

    const projects = await findProjectsByUserService.execute({
      userId: user.id,
      query: search,
    });

    return response.json(projects);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { title, tags, link, description, image } = request.body;

    const createProjectService = container.resolve(CreateProjectService);

    const newProject = await createProjectService.execute(user.id, {
      title,
      tags,
      link,
      description,
      image,
    });

    return response.status(201).json(newProject);
  }
}
