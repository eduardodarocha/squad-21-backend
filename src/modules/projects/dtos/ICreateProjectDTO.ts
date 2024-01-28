import { User } from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateProjectDTO {
  user?: User;
  title: string;
  tags: string;
  link: string;
  description: string;
  image: string;
}
