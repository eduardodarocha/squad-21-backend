import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { formatProjectResponse } from '../utils/formatProjectResponse';
import IResponseProjectDTO from '../dtos/IResponseProjectDTO';

interface IRequest {
  userId: string;
  query: string | any;
}

@injectable()
class FindAllProjectsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ userId, query }: IRequest): Promise<void> {
    const isUser = await this.usersRepository.findById(userId);

    if (!isUser) {
      throw new AppError(
        'Você não tem permissão para realizar essa ação.',
        401,
      );
    }

    let projects: any = [];

    if (query) {
      const tags = query.toLocaleLowerCase().split('%');

      await Promise.all(
        tags.map(async tag => {
          const filteredProjects = await this.projectsRepository.findAll(
            userId,
            tag,
          );

          projects = projects.concat(filteredProjects);
        }),
      );

      const uniqueProjects = projects.filter(
        (project: any, index: any, self: any) =>
          index === self.findIndex(p => p.id === project.id),
      );

      projects = uniqueProjects;
    } else {
      projects = await this.projectsRepository.findAll(userId, null);
    }

    const formattedProjectsList = formatProjectResponse(projects);

    return formattedProjectsList;
  }
}

export default FindAllProjectsService;
