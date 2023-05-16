import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'

@injectable()
export class GetAllTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  async execute() {
    const { startDateMont, endDateMontFormat } = getTotalWeeksInMonth()
    const transactions = await this.transactionsRepository.findAllTransactions(
      startDateMont,
      endDateMontFormat,
    )

    return transactions
  }
}
