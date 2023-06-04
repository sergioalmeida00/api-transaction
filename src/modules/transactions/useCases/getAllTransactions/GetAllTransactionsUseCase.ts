import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'
import { GetTransactionsDTO, TransactionsDTO } from '../DTO/TransactinonsDTO'

@injectable()
export class GetAllTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  async execute({
    userId,
    startDate,
    endDate,
  }: GetTransactionsDTO): Promise<TransactionsDTO[]> {
    const { startDateMont, endDateMontFormat } = getTotalWeeksInMonth()

    const startDateToSend = startDate || startDateMont
    const endDateToSend = endDate || endDateMontFormat

    const transactions = await this.transactionsRepository.findAllTransactions(
      startDateToSend,
      endDateToSend,
      userId,
    )

    return transactions
  }
}
