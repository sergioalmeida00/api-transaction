import { inject, injectable } from 'tsyringe'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { ISummaryTransactionsDTO } from './summaryTransactionsDTO'

@injectable()
export class SummaryTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(userId: string): Promise<ISummaryTransactionsDTO> {
    const { weeksInMonth, startDateMont, endDateMontFormat } =
      getTotalWeeksInMonth()

    const summary = await this.transactionRepository.summaryTransaction({
      userId,
      startDateMont,
      endDateMontFormat,
    })

    const summaryBalance = summary.reduce(
      (
        { totalIncome, totalExpense, totalBalance, weekSummary, daySummary },
        operation,
      ) => {
        if (operation.amount > 0) {
          totalIncome += Number(operation.amount)
        } else {
          totalExpense += Number(operation.amount)
        }
        totalBalance = totalIncome + totalExpense
        weekSummary = totalBalance / weeksInMonth
        daySummary = weekSummary / Number(process.env.QUANTITY_OF_DAYS)

        return {
          totalIncome,
          totalExpense,
          totalBalance,
          weekSummary,
          daySummary,
        }
      },
      {
        totalIncome: 0,
        totalExpense: 0,
        totalBalance: 0,
        weekSummary: 0,
        daySummary: 0,
      },
    )

    return summaryBalance
  }
}
