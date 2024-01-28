import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';

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
  }: ICreateUserDTO): Promise<void> {
    const emailCaseSensitive = email.toLocaleLowerCase();

    const isEmailUser = await this.usersRepository.findByEmail(
      emailCaseSensitive,
    );

    if (isEmailUser) {
      throw new AppError('Esse e-mail já está sendo utilizado.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    await this.usersRepository.create({
      name,
      lastname,
      email: emailCaseSensitive,
      password: hashedPassword,
      country: 'Brasil',
    });
  }
}

export default CreateUserService;
