import { GetBalanceUseCase } from './GetBalanceUseCase';
import { CreateUserUseCase } from './../../../users/useCases/createUser/CreateUserUseCase';
import { CreateStatementUseCase } from './../createStatement/CreateStatementUseCase';
import { InMemoryStatementsRepository } from './../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from './../../../users/repositories/in-memory/InMemoryUsersRepository';
describe('Get Balance', () => {
  it('should be able view a balance from user', async () => {


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


    //-----------

    // Get balance passando user id
    let useCaseGetBalance = new GetBalanceUseCase(statRepo, userRepo)
    let balance = await useCaseGetBalance.execute({ user_id: user.id })

    // o Balance deve ser 200
    expect(balance.balance).toBe(200)

  });
});
