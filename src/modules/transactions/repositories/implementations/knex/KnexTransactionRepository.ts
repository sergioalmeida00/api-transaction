import { knex } from '../../../../../database'
import { ICreateTransactionDTO } from '../../../useCases/createTransactions/CreateTransactionsDTO'
import { TransactionsDTO } from '../../../useCases/DTO/TransactinonsDTO'
import {
  IInputSummaryTransactionsDTO,
  IOutputSummaryRepository,
} from '../../../useCases/summaryTransactions/summaryTransactionsDTO'
import {
  IInputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryDTO,
} from '../../../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'
import {
  IInputTransactionByIdDTO,
  IOutputTransactionByIdDTO,
} from '../../../useCases/transactionById/TransactionByIdDTO'
import { ITransactionRepository } from '../../ITransactionRepository'

export class KnexTransactionRepository implements ITransactionRepository {
  async create({
    title,
    amount,
    type,
    id,
    userId,
    categoryId,
    releaseDate,
  }: ICreateTransactionDTO): Promise<void> {
    await knex('transactions').insert({
      id,
      title,
      amount,
      user_id: userId,
      category_id: categoryId,
      release_date: releaseDate,
    })
  }

  async findAllTransactions(
    startDateMont: string,
    endDateMontFormat: string,
    userId: string,
  ): Promise<TransactionsDTO[]> {
    const transactions = await knex('transactions')
      .join('category', 'transactions.category_id', 'category.id')
      .select([
        'transactions.id',
        'transactions.title',
        'transactions.amount',
        'transactions.release_date',
        'transactions.user_id',
        'transactions.category_id',
        'category.description',
      ])
      .whereBetween('transactions.release_date', [
        startDateMont,
        endDateMontFormat,
      ])
      .andWhere({ user_id: userId })
      .orderBy('release_date', 'desc')
    return transactions
  }

  async findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<IOutputTransactionByIdDTO> {
    const transaction = await knex('transactions')
      .where({
        user_id: userId,
        id,
      })
      .first()

    return transaction
  }

  async summaryTransaction({
    userId,
    startDateMont,
    endDateMontFormat,
  }: IInputSummaryTransactionsDTO): Promise<IOutputSummaryRepository[]> {
    const summaryTransaction = await knex
      .select('amount', 'type')
      .from('transactions')
      .innerJoin('category', 'transactions.category_id', 'category.id')
      .where({ user_id: userId })
      .andWhereBetween('release_date', [startDateMont, endDateMontFormat])

    return summaryTransaction
  }

  async summaryTransactionTypeCategory({
    userId,
    startDate,
    endDate,
  }: IInputSummaryTypeCategoryDTO): Promise<IOutputSummaryTypeCategoryDTO[]> {
    const transactionsTypeCategory = await knex
      .select('type', 'amount')
      .from('transactions')
      .innerJoin('category', 'transactions.category_id', 'category.id')
      .where({ user_id: userId })
      .andWhereBetween('release_date', [startDate, endDate])

    return transactionsTypeCategory
  }
}
