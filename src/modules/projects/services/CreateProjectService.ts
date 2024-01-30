import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageImagesProvider from '@shared/container/providers/StorageImagesProvider/models/IStorageImagesProvider';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { Project } from '../infra/typeorm/entities/Project';

@injectable()
class CreateProjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('DiskStorageImagesProvider')
    private storageProvider: IStorageImagesProvider,
  ) {}

  public async execute(
    userId: string,
    { title, tags, link, description, image }: ICreateProjectDTO,
  ): Promise<Project> {
    const isUser = await this.usersRepository.findById(userId);

    if (!isUser) {
      throw new AppError(
        'Você não tem permissão para realizar essa ação.',
        401,
      );
    }

    const titleCaseSensitive = title.toLocaleLowerCase();

    const isTitleProject = await this.projectsRepository.findByTitle(
      titleCaseSensitive,
    );

    if (isTitleProject) {
      throw new AppError(
        'Esse título já está sendo utilizado para um projeto. Informe outro título, por favor.',
      );
    }

    const isLinkProject = await this.projectsRepository.findByLink(link);

    if (isLinkProject) {
      throw new AppError('Esse link já está cadastrado para um projeto.');
    }

    const filename = await this.storageProvider.saveFile(image);

    const newProject = await this.projectsRepository.create({
      title: titleCaseSensitive,
      tags: tags.toLocaleLowerCase(),
      link,
      description,
      image: filename,
    });

    return newProject;
  }
}

export default CreateProjectService;
