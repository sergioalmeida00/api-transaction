import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'
import { IInputTransactionByIdDTO } from '../useCases/transactionById/TransactionByIdDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
  findAllTransactions(): Promise<ICreateTransactionDTO[]>
  findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<ICreateTransactionDTO>
}

export { ITransactionRepository }
