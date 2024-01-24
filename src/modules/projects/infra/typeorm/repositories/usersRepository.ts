import { getRepository, Repository } from 'typeorm';
import { User } from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class usersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmailSession(email: string): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
    lastname,
    country,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
      country,
      lastname,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default usersRepository;
