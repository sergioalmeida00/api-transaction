import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SummaryTransactionTypeCategoryUseCase } from './summaryTransactionTypeCategoryUseCase'

export class SummaryTransactionTypeCategoryController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const summaryTransactionTypeCategoryUseCase = container.resolve(
      SummaryTransactionTypeCategoryUseCase,
    )
    const summaryTypeCategory =
      await summaryTransactionTypeCategoryUseCase.execute(userId)

    // console.log(result)

    return response.status(200).json({ summaryTypeCategory })
  }
}
