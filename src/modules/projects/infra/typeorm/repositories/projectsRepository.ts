import { getRepository, Repository } from 'typeorm';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

class projectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByTitle(title: string): Promise<Project | undefined> {
    const project = await this.ormRepository
      .createQueryBuilder('project')
      .where('project.title = :title', { title })
      .getOne();

    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { id },
    });

    return project;
  }

  public async findByTags(tags: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { tags },
    });

    return project;
  }

  public async create({
    title,
    tags,
    link,
    description,
    image,
  }: ICreateProjectDTO): Promise<Project> {
    const project = await this.ormRepository.create({
      title,
      tags,
      link,
      description,
      image,
    });

    await this.ormRepository.save(project);

    return project;
  }
}

export default projectsRepository;
