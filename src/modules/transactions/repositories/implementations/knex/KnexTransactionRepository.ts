import { knex } from '../../../../../database'
import { ICreateTransactionDTO } from '../../../useCases/createTransactions/CreateTransactionsDTO'
import { ITransactionRepository } from '../../ITransactionRepository'

export class KnexTransactionRepository implements ITransactionRepository {
  async create({
    title,
    amount,
    type,
    id,
    userId,
  }: ICreateTransactionDTO): Promise<void> {
    await knex('transactions').insert({
      id,
      title,
      amount,
      user_id: userId,
    })
  }

  async findAllTransactions(): Promise<ICreateTransactionDTO[]> {
    const transactions = await knex('transactions')
      .select('*')
      .orderBy('amount', 'desc')

    return transactions
  }
}
