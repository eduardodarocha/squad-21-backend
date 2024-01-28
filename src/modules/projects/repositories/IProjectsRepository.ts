import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IUpdateProjectDTO from '../dtos/IUpdateProjectDTO';

export default interface IProjectRepository {
  findAll(idUser: string, query: string | null): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  findByTitle(title: string): Promise<Project | undefined>;
  findByLink(link: string): Promise<Project | undefined>;
  findByUser(idUser: string, query: string | null): Promise<Project[]>;
  create({
    user,
    title,
    tags,
    link,
    description,
    image,
  }: ICreateProjectDTO): Promise<Project>;
  update({
    id,
    title,
    tags,
    link,
    description,
    image,
  }: IUpdateProjectDTO): Promise<Project | undefined>;
  delete(id: string): Promise<void>;
}
