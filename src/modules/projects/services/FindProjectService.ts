import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IResponseProjectDTO from '../dtos/IResponseProjectDTO';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class FindProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<IResponseProjectDTO> {
    const isUser = await this.usersRepository.findById(userId);

    if (!isUser) {
      throw new AppError(
        'Você não tem permissão para realizar essa ação.',
        401,
      );
    }

    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Não foi possível encontrar esse projeto.');
    }

    return {
      id: project.id,
      user_name: `${project.user.name} ${project.user.lastname}`,
      title: project.title,
      description: project.description,
      link: project.link,
      tags: project.tags,
      image_url: project.getImageUrl() || '',
      created_at: project.created_at,
    };
  }
}

export default FindProjectService;
