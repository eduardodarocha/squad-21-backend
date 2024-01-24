import { User } from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmailSession(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({
    name,
    email,
    password,
    country,
    lastname,
  }: ICreateUserDTO): Promise<User>;
}
