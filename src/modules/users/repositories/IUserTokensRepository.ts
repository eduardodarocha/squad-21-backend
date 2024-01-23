import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string, is_new_access: boolean): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
