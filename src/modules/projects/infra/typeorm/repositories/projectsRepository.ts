import { getRepository, Like, Not, Repository } from 'typeorm';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IUpdateProjectDTO from '@modules/projects/dtos/IUpdateProjectDTO';

class projectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByTitle(title: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return project;
  }

  public async findByLink(link: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: {
        link,
      },
    });

    return project;
  }

  public async findAll(
    idUser: string,
    query: string | null,
  ): Promise<Project[]> {
    let projects = [];

    if (query) {
      projects = await this.ormRepository.find({
        where: {
          user_id: Not(idUser),
          tags: Like(`%${query}%`),
        },
        relations: ['user'],
      });
    } else {
      projects = await this.ormRepository.find({
        where: {
          user_id: Not(idUser),
        },
        relations: ['user'],
      });
    }

    return projects;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    return project;
  }

  public async findByUser(
    idUser: string,
    query: string | null,
  ): Promise<Project[]> {
    let projects = [];

    if (query) {
      projects = await this.ormRepository.find({
        where: {
          user_id: idUser,
          tags: Like(`%${query}%`),
        },
        relations: ['user'],
      });
    } else {
      projects = await this.ormRepository.find({
        where: {
          user_id: idUser,
        },
        relations: ['user'],
      });
    }

    return projects;
  }

  public async create({
    user,
    title,
    tags,
    link,
    description,
    image,
  }: ICreateProjectDTO): Promise<Project> {
    const project = await this.ormRepository.create({
      user,
      title,
      tags,
      link,
      description,
      image,
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async update({
    id,
    title,
    tags,
    link,
    description,
    image,
  }: IUpdateProjectDTO): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne({
      where: { id },
    });

    if (project) {
      project.title = title;
      project.tags = tags;
      project.link = link;
      project.description = description;
      project.image = image;

      await this.ormRepository.save(project);

      return project;
    }

    return undefined;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default projectsRepository;
