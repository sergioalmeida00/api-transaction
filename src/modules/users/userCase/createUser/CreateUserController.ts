import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserSchema = z.object({
      login: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { login, email, password } = createUserSchema.parse(request.body)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({ login, email, password })

    return response.sendStatus(201)
  }
}
