import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'
import { IOutputSummaryRepository } from '../useCases/summaryTransactions/summaryTransactionsDTO'
import { IOutputSummaryTypeCategoryDTO } from '../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'
import { IInputTransactionByIdDTO } from '../useCases/transactionById/TransactionByIdDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>
  findAllTransactions(): Promise<ICreateTransactionDTO[]>
  findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<ICreateTransactionDTO>
  summaryTransaction(userId: string): Promise<IOutputSummaryRepository[]>
  summaryTransactionTypeCategory(
    userId: string,
  ): Promise<IOutputSummaryTypeCategoryDTO[]>
}

export { ITransactionRepository }
