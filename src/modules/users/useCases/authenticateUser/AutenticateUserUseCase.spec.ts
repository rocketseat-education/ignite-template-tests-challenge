import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
describe('Auth User', () => {
  it('should be able auth user', async () => {


    let userRepositoryInMemory = new InMemoryUsersRepository();
    let useCase = new CreateUserUseCase(userRepositoryInMemory)


    const user = await useCase.execute({ name: 'Gustavo', email: "gust@.com", password: "1234abcd" })



    let useCaseAuth = new AuthenticateUserUseCase(userRepositoryInMemory)

    let userWToken = await useCaseAuth.execute({ email: 'gust@.com', password: "1234abcd" })

    expect(userWToken).toBeDefined()

  });
});
