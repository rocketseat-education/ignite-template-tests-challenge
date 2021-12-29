import { ICreateUserDTO } from './ICreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import 'reflect-metadata';
describe('Create User', () => {
  it('should be able create a user', async () => {

    let userRepositoryInMemory = new InMemoryUsersRepository();
    let useCase = new CreateUserUseCase(userRepositoryInMemory)


    const user = await useCase.execute({ name: 'Gustavo', email: "gust@.com", password: "1234abcd" })

    expect(user).toBeDefined()

    expect(user).toMatchObject({
      name: "Gustavo"
    })
  });
});
