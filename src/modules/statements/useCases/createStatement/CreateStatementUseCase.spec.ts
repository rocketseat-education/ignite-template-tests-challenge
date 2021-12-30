import { CreateUserUseCase } from './../../../users/useCases/createUser/CreateUserUseCase';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
import { UsersRepository } from './../../../users/repositories/UsersRepository';
describe('Create statement', () => {
  it('should be able create a new statement', async () => {
    // Repositorios
    let userRepo = new InMemoryUsersRepository()
    let statRepo = new InMemoryStatementsRepository();

    // Use Cases
    let useCaseStat = new CreateStatementUseCase(userRepo, statRepo)
    let useCaseCreateUser = new CreateUserUseCase(userRepo)

    //Cria Usuário
    let user = await useCaseCreateUser.execute({ name: "gustavo", email: "gust@.com", password: "1234abcd" })

    // Define type do parametro
    enum OperationType {
      DEPOSIT = 'deposit',
      WITHDRAW = 'withdraw',
    }

    //Deposita 200 na conta do usuário
    let stat = await useCaseStat.execute({ user_id: user.id, type: 'deposit' as OperationType, amount: 200, description: "desposit 200" })


    // Testa se o retorno é 200
    expect(stat).toMatchObject({
      amount: 200
    })

  });
});
