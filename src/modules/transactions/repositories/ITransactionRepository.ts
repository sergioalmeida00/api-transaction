import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'
import { TransactionsDTO } from '../useCases/DTO/TransactinonsDTO'
import {
  IInputSummaryTransactionsDTO,
  IOutputSummaryRepository,
} from '../useCases/summaryTransactions/summaryTransactionsDTO'
import {
  IInputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryDTO,
} from '../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'
import {
  IInputTransactionByIdDTO,
  IOutputTransactionByIdDTO,
} from '../useCases/transactionById/TransactionByIdDTO'

interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<void>

  findAllTransactions(
    startDateMont: string,
    endDateMontFormat: string,
    userId: string,
  ): Promise<TransactionsDTO[]>

  findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<IOutputTransactionByIdDTO>

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
