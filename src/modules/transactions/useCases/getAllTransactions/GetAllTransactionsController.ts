import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { TransactionsMap } from '../../mappers/TransactionsMap'
import { GetAllTransactionsUseCase } from './GetAllTransactionsUseCase'

export class GetAllTransactionsController {
  async handle(request: Request, response: Response) {
    const getTransactionsUseCase = container.resolve(GetAllTransactionsUseCase)
    const transactions = await getTransactionsUseCase.execute()

    const transactionsMapDTO = TransactionsMap.toDTO(transactions)
    return response.status(200).json({ transactionsMapDTO })
  }
}
