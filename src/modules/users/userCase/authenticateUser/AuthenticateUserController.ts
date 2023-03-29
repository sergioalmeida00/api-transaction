import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserSchema = z.object({
      login: z.string(),
      password: z.string().min(6),
    })

    const { login, password } = authenticateUserSchema.parse(request.body)

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUserUseCase.execute({ login, password })

    return response.status(200).json({ token })
  }
}
