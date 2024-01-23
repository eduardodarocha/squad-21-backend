import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserService from '@modules/users/services/users/FindUserService';
import CreateUserService from '@modules/users/services/users/CreateUserService';

export default class usersController {
  public async showMe(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const findUserService = container.resolve(FindUserService);

    const userFound = await findUserService.execute({
      id: user.id,
    });

    return response.json(userFound);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password, country } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const newUser = await createUserService.execute({
      name,
      lastname,
      email,
      password,
      country,
    });

    return response.status(201).json(newUser);
  }
}
