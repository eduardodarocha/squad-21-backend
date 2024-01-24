import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { User } from '../../infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    lastname,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const emailCaseSensitive = email.toLocaleLowerCase();

    const isEmailUser = await this.usersRepository.findByEmail(
      emailCaseSensitive,
    );

    if (isEmailUser) {
      throw new AppError('Esse e-mail já está sendo utilizado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      lastname,
      email: emailCaseSensitive,
      password: hashedPassword,
      country: 'Brasil',
    });

    return newUser;
  }
}

export default CreateUserService;
