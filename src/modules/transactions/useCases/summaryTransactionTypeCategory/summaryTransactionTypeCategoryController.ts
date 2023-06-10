import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SummaryCategoryTypeMap } from '../../mappers/SummaryCategoryType'
import { SummaryTransactionTypeCategoryUseCase } from './summaryTransactionTypeCategoryUseCase'

export class SummaryTransactionTypeCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const { startDate, endDate } = request.query

    const summaryTransactionTypeCategoryUseCase = container.resolve(
      SummaryTransactionTypeCategoryUseCase,
    )
    const summaryType = await summaryTransactionTypeCategoryUseCase.execute({
      userId,
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
    })
    const summaryTypeCategory = SummaryCategoryTypeMap.toDTO(summaryType)
    return response.status(200).json({ summaryTypeCategory })
  }
}
