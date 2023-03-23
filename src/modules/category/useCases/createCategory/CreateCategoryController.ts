import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const categorySchema = z.object({
      description: z.string().min(3),
      type: z.enum(['investment', 'necessity', 'spending']),
    })

    const { description, type } = categorySchema.parse(request.body)

    const createCategoryUseCase = await container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.execute({ description, type })

    return response.sendStatus(201)
  }
}
