import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectRepository {
  findByTags(tags: string): Promise<Project | undefined>;
  findByTitle(title: string): Promise<Project | undefined>;
  findById(id: string): Promise<Project | undefined>;
  create({
    title,
    tags,
    link,
    description,
    image,
  }: ICreateProjectDTO): Promise<Project>;
}
