import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import {
  IInputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryReduceDTO,
} from './SummaryTypeCategoryDTO'

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
  }: IInputSummaryTypeCategoryDTO): Promise<IOutputSummaryTypeCategoryReduceDTO> {
    const summaryTransactionTypeCategory =
      await this.transactionRepository.summaryTransactionTypeCategory({
        userId,
        startDate,
        endDate,
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
