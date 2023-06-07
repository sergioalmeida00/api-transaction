import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { IOutputSummaryTypeCategoryReduceDTO } from './SummaryTypeCategoryDTO'
import { GetTransactionsDTO } from '../DTO/TransactinonsDTO'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'

@injectable()
export class SummaryTransactionTypeCategoryUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    userId,
    startDate,
    endDate,
  }: GetTransactionsDTO): Promise<IOutputSummaryTypeCategoryReduceDTO> {
    const { startDateMont, endDateMontFormat } = getTotalWeeksInMonth()

    const startDateToSend = startDate || startDateMont
    const endDateToSend = endDate || endDateMontFormat

    const summaryTransactionTypeCategory =
      await this.transactionRepository.summaryTransactionTypeCategory({
        userId,
        startDate: startDateToSend,
        endDate: endDateToSend,
      })

    const summary = summaryTransactionTypeCategory.reduce(
      (accumulator, summary) => {
        const { type, amount } = summary

        if (accumulator[type]) {
          accumulator[type] += Number(amount)
        } else {
          accumulator[type] = Number(amount)
        }

        return accumulator
      },
      {} as IOutputSummaryTypeCategoryReduceDTO,
    )
    const totalBalance: number = Object.values(summary).reduce(
      (sum: number, amount: number) => sum + amount,
      0,
    )
    return { ...summary, totalBalance }
  }
}
