import { AuthenticateUserUseCase } from './../authenticateUser/AuthenticateUserUseCase';

import { CreateUserUseCase } from './../createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';
describe('Show', () => {
  it('should be able show user', async () => {


    let userRepositoryInMemory = new InMemoryUsersRepository();
    let useCase = new CreateUserUseCase(userRepositoryInMemory)
    const user = await useCase.execute({ name: 'Gustavo', email: "gust@.com", password: "1234abcd" })



    let useCaseAuth = new AuthenticateUserUseCase(userRepositoryInMemory)
    let userWToken = await useCaseAuth.execute({ email: 'gust@.com', password: "1234abcd" })

    let useCaseShow = new ShowUserProfileUseCase(userRepositoryInMemory);
    let userShow = await useCaseShow.execute(userWToken.user.id)

    expect(userShow).toMatchObject({
      name: "Gustavo"
    })

  });
});
