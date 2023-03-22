import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SummaryTransactionsUseCase } from './SummaryTransactionsUseCase'

export class SummaryTransactionsController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const summaryUseCase = container.resolve(SummaryTransactionsUseCase)

    const summaryBalance = await summaryUseCase.execute(userId)

    return response.status(200).json({ summaryBalance })
  }
}
