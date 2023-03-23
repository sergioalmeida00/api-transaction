import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { IOutputSummaryTypeCategoryReduceDTO } from './SummaryTypeCategoryDTO'

@injectable()
export class SummaryTransactionTypeCategoryUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(userId: string) {
    const summaryTransactionTypeCategory =
      await this.transactionRepository.summaryTransactionTypeCategory(userId)

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
    return summary
  }
}
