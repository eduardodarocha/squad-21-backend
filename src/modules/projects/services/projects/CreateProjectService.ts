import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectsRepository from '../../repositories/IProjectsRepository';
import { Project } from '../../infra/typeorm/entities/Project';

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    title,
    tags,
    link,
    description,
    image,
  }: ICreateProjectDTO): Promise<Project> {
    const titleCaseSensitive = title.toLocaleLowerCase();

    const isTitleProject = await this.projectsRepository.findByTitle(
      titleCaseSensitive,
    );
    if (isTitleProject) {
      throw new AppError('Esse título já está sendo utilizado.');
    }

    const newProject = await this.projectsRepository.create({
      title: titleCaseSensitive,
      tags,
      link,
      description,
      image,
    });

    return newProject;
  }
}

export default CreateProjectService;
