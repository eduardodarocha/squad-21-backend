import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/users/CreateUserService';

export default class usersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, lastname, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      lastname,
      email,
      password,
    });

    return response.status(201).end();
  }
}
