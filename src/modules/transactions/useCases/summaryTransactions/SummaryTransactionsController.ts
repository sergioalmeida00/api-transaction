import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SummaryTransactionsUseCase } from './SummaryTransactionsUseCase'

export class SummaryTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { startDate, endDate } = request.query
    const summaryUseCase = container.resolve(SummaryTransactionsUseCase)

    const summaryBalance = await summaryUseCase.execute({
      userId,
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
    })

    return response.status(200).json({ summaryBalance })
  }
}
