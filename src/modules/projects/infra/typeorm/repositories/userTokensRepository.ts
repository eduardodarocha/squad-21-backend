import { getRepository, Repository } from 'typeorm';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class userTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(
    user_id: string,
    is_new_access: boolean,
  ): Promise<UserToken> {
    const userToken = await this.ormRepository.create({
      user_id,
      is_new_access,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default userTokensRepository;
