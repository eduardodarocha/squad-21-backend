import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class FindProjectService {
  constructor(
    @inject('ProjectsRepository')
    private usersRepository: IProjectsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Omit<Project, 'password'>> {
    const project = await this.usersRepository.findById(id);
    // verifica para  o que a 'password' precisa ser mudada

    if (!project) {
      throw new AppError('Projeto não encontrado.');
    }

    const formatedProject = {
      id: project.id,
      title: project.title,
      tags: project.tags,
      link: project.link,
      description: project.description,
      image: project.image,
      created_at: project.created_at,
      updated_at: project.updated_at,
    };

    return formatedProject;
  }
}

export default FindProjectService;
