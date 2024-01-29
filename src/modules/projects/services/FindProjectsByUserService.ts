import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseProjectDTO from '../dtos/IResponseProjectDTO';
import { formatProjectResponse } from '../utils/formatProjectResponse';

interface IRequest {
  userId: string;
  query: string | any;
}

@injectable()
class FindProjectsByUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    userId,
    query,
  }: IRequest): Promise<IResponseProjectDTO[]> {
    const isUser = await this.usersRepository.findById(userId);

    if (!isUser) {
      throw new AppError(
        'Você não tem permissão para realizar essa ação.',
        401,
      );
    }

    const projects = await this.projectsRepository.findByUser(
      userId,
      query ? query.toLocaleLowerCase() : null,
    );

    const formattedProjectsList = formatProjectResponse(projects);

    return formattedProjectsList;
  }
}

export default FindProjectsByUserService;