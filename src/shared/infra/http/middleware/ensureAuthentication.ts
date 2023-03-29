import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { KnexUserRepository } from '../../../../modules/users/userCase/repositories/implementations/knex/KnexUserRepository'

interface IPayloadDTO {
  sub: string
}
export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers

  if (!authorization) {
    throw new Error('JWT Token Missing Error')
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: userId } = verify(
      token,
      process.env.JWT_PASS ?? '',
    ) as IPayloadDTO

    const verifyUserExists = new KnexUserRepository().findByIdUser(userId)

    if (!verifyUserExists) {
      throw new Error('User does not exist')
    }

    request.user = {
      id: userId,
    }
    next()
  } catch (error) {
    throw new Error('JWT Token Invalid')
  }
}
