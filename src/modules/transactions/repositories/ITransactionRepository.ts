import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
  findAllTransactions(): Promise<ICreateTransactionDTO[]>
}

export { ITransactionRepository }
