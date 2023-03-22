import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'
import { IOutputSummaryRepository } from '../useCases/summaryTransactions/summaryTransactionsDTO'
import { IInputTransactionByIdDTO } from '../useCases/transactionById/TransactionByIdDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
  findAllTransactions(): Promise<ICreateTransactionDTO[]>
  findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<ICreateTransactionDTO>
  summaryTransaction(userId: string): Promise<IOutputSummaryRepository[]>
}

export { ITransactionRepository }
