import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'
import { GetTransactionsDTO } from '../DTO/TransactinonsDTO'

@injectable()
export class GetAllTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  async execute({ userId, startDate, endDate }: GetTransactionsDTO) {
    const { startDateMont, endDateMontFormat } = getTotalWeeksInMonth()

    const startDateToSend = startDate || startDateMont
    const endDateToSend = endDate || endDateMontFormat

    console.log(startDateToSend, endDateToSend)
    const transactions = await this.transactionsRepository.findAllTransactions(
      startDateToSend,
      endDateToSend,
      userId,
    )

    return transactions
  }
}
