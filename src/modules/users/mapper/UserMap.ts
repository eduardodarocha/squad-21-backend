import { instanceToInstance } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import IResponseDTO from '../dtos/IResponseDTO';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    created_at,
    updated_at,
    country,
    lastname,
  }: User): IResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      lastname,
      email,
      country,
      updated_at,
      created_at,
    });

    return user;
  }
}

export default UserMap;
