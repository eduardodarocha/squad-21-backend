import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IResponseDTO from '@modules/users/dtos/IResponseDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import UserMap from '../../mapper/UserMap';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IResponseDTO;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const emailCaseSensitive = email.toLocaleLowerCase();

    const user = await this.usersRepository.findByEmailSession(
      emailCaseSensitive,
    );

    if (!user) {
      throw new AppError('Email/Senha incorretos', 401);
    }

    const comparePassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!comparePassword) {
      throw new AppError('Email/Senha incorretos', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: UserMap.toDTO(user),
      token,
    };
  }
}

export default AuthenticateUserService;
