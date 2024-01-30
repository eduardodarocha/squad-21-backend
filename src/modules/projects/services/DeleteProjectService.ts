import { inject, injectable } from 'tsyringe';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageImagesProvider from '@shared/container/providers/StorageImagesProvider/models/IStorageImagesProvider';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DiskStorageImagesProvider')
    private storageProvider: IStorageImagesProvider,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<void> {
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

    if (project.user_id !== userId) {
      throw new AppError(
        'Você não tem permissão para realizar essa ação.',
        401,
      );
    }

    if (project.image) {
      await this.storageProvider.deleteFile(project.image);
    }

    await this.projectsRepository.delete(id);
  }
}

export default DeleteProjectService;
