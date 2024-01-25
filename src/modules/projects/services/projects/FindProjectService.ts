import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const formatedUser = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      country: user.country,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return formatedUser;
  }
}

export default FindUserService;
