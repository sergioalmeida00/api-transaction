import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'
import {
  IInputSummaryTransactionsDTO,
  IOutputSummaryRepository,
} from '../useCases/summaryTransactions/summaryTransactionsDTO'
import {
  IInputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryDTO,
} from '../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'
import { IInputTransactionByIdDTO } from '../useCases/transactionById/TransactionByIdDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>

  findAllTransactions(): Promise<ICreateTransactionDTO[]>

  findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<ICreateTransactionDTO>

  summaryTransaction({
    userId,
    startDateMont,
    endDateMontFormat,
  }: IInputSummaryTransactionsDTO): Promise<IOutputSummaryRepository[]>

  summaryTransactionTypeCategory({
    userId,
    startDate,
    endDate,
  }: IInputSummaryTypeCategoryDTO): Promise<IOutputSummaryTypeCategoryDTO[]>
}

export { ITransactionRepository }
