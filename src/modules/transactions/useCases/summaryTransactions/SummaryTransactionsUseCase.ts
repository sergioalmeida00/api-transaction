import { inject, injectable } from 'tsyringe'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'

@injectable()
export class SummaryTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(userId: string) {
    const summary = await this.transactionRepository.summaryTransaction(userId)

    const month = new Date().getMonth()
    const year = new Date().getFullYear()

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
        weekSummary = totalBalance / getTotalWeeksInMonth(month, year)
        daySummary = weekSummary / 3

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
