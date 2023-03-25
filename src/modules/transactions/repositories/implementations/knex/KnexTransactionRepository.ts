import { knex } from '../../../../../database'
import { ICreateTransactionDTO } from '../../../useCases/createTransactions/CreateTransactionsDTO'
import { IOutputSummaryRepository } from '../../../useCases/summaryTransactions/summaryTransactionsDTO'
import {
  IInputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryDTO,
} from '../../../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'
import { IInputTransactionByIdDTO } from '../../../useCases/transactionById/TransactionByIdDTO'
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

  async findAllTransactions(): Promise<ICreateTransactionDTO[]> {
    const transactions = await knex('transactions')
      .select('*')
      .orderBy('amount', 'desc')

    return transactions
  }

  async findByIdTransaction({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<ICreateTransactionDTO> {
    const transaction = await knex('transactions')
      .where({
        user_id: userId,
        id,
      })
      .first()

    return transaction
  }

  async summaryTransaction(
    userId: string,
  ): Promise<IOutputSummaryRepository[]> {
    const summaryTransaction = await knex('transactions')
      .select('amount')
      .where({ user_id: userId })

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
