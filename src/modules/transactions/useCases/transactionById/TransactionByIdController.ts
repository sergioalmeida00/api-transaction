import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { TransactionByIdUseCase } from './TransactionByIdUseCase'

export class TransactionByIdController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user
    const transactionByIdUseCase = container.resolve(TransactionByIdUseCase)
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamSchema.parse(request.params)

    const transaction = await transactionByIdUseCase.execute({ id, userId })

    return response.status(200).json({ transaction })
  }
}
