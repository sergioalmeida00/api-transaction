import { inject, injectable } from 'tsyringe'
import { getTotalWeeksInMonth } from '../../../../utils/getTotalWeeksInMonth'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { ISummaryTransactionsDTO } from './summaryTransactionsDTO'
import { GetTransactionsDTO } from '../DTO/TransactinonsDTO'

@injectable()
export class SummaryTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    userId,
    startDate,
    endDate,
  }: GetTransactionsDTO): Promise<ISummaryTransactionsDTO> {
    const { weeksInMonth, startDateMont, endDateMontFormat } =
      getTotalWeeksInMonth()

    const startDateToSend = startDate || startDateMont
    const endDateToSend = endDate || endDateMontFormat

    const summary = await this.transactionRepository.summaryTransaction({
      userId,
      startDateMont: startDateToSend,
      endDateMontFormat: endDateToSend,
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

    const calculateReserveEmergency = summary.reduce(
      ({ emergencyReserve, invested, total }, operation) => {
        if (operation.amount < 0 && operation.type !== 'investment') {
          emergencyReserve += Math.abs(
            Number(operation.amount) *
              Number(process.env.QUANTITY_OF_MONTH_EMERGENCY),
          )
        } else if (operation.type === 'investment') {
          invested += Math.abs(Number(operation.amount))
        }
        total = emergencyReserve - invested
        return { emergencyReserve, invested, total }
      },
      {
        emergencyReserve: 0,
        invested: 0,
        total: 0,
      },
    )

    return Object.assign(summaryBalance, calculateReserveEmergency)
  }
}
