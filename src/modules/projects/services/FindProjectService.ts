import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import IResponseProjectDTO from '../dtos/IResponseProjectDTO';

interface IRequest {
  id: string;
}

@injectable()
class FindProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponseProjectDTO> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Não foi possível encontrar esse projeto.', 400);
    }

    return {
      id: project.id,
      user_name: `${project.user.name} ${project.user.lastname}`,
      title: project.title,
      tags: project.tags,
      link: project.link,
      description: project.description,
      image_url: project.image_url,
      created_at: project.created_at,
    };
  }
}

export default FindProjectService;
