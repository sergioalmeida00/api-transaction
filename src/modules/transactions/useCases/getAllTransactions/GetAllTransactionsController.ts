import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { TransactionsMap } from '../../mappers/TransactionsMap'
import { GetAllTransactionsUseCase } from './GetAllTransactionsUseCase'

export class GetAllTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { startDate, endDate } = request.query

    const getTransactionsUseCase = container.resolve(GetAllTransactionsUseCase)
    const transactions = await getTransactionsUseCase.execute({
      userId,
      startDate: startDate ? String(startDate) : undefined,
      endDate: endDate ? String(endDate) : undefined,
    })

    const transactionsMapDTO = TransactionsMap.toDTO(transactions)
    return response.status(200).json({ transactionsMapDTO })
  }
}
