import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
}

export { ITransactionRepository }
