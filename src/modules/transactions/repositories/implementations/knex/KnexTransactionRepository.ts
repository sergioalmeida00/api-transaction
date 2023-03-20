import { knex } from '../../../../../database'
import { ICreateTransactionDTO } from '../../../useCases/createTransactions/CreateTransactionsDTO'
import { ITransactionRepository } from '../../ITransactionRepository'

export class KnexTransactionRepository implements ITransactionRepository {
  async create({
    title,
    amount,
    type,
    id,
  }: ICreateTransactionDTO): Promise<void> {
    await knex('transactions').insert({
      id,
      title,
      amount,
    })
  }

  async findAllTransactions(): Promise<ICreateTransactionDTO[]> {
    const transactions = await knex('transactions')
      .select('*')
      .orderBy('amount', 'desc')

    return transactions
  }
}
