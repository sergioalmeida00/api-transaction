import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateTransactionsUseCase } from './CreateTransactionsUseCase'

export class CreateTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const createTransactionsSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
      categoryId: z.string().uuid(),
      releaseDate: z.coerce.date(),
    })

    const createTransactionsUseCase = container.resolve(
      CreateTransactionsUseCase,
    )

    const { title, amount, type, categoryId, releaseDate } =
      createTransactionsSchema.parse(request.body)

    await createTransactionsUseCase.execute({
      title,
      amount,
      type,
      userId,
      categoryId,
      releaseDate,
    })

    return response.sendStatus(201)
  }
}
