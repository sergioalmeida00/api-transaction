import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { SummaryTransactionTypeCategoryUseCase } from './summaryTransactionTypeCategoryUseCase'

export class SummaryTransactionTypeCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const queryDateSchema = z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    })

    const { startDate, endDate } = queryDateSchema.parse(request.query)

    const summaryTransactionTypeCategoryUseCase = container.resolve(
      SummaryTransactionTypeCategoryUseCase,
    )
    const summaryTypeCategory =
      await summaryTransactionTypeCategoryUseCase.execute({
        userId,
        startDate,
        endDate,
      })

    return response.status(200).json({ summaryTypeCategory })
  }
}
