import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

@injectable()
export class GetAllTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  async execute() {
    const transactions = await this.transactionsRepository.findAllTransactions()

    return transactions
  }
}
