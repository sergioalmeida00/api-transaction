import { NextFunction, Request, Response } from 'express'
import { getCookies } from '../utils/cookies'

export function middlewareCookies(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sessionId = getCookies(request.headers.cookie)

  if (!sessionId) {
    return response.status(401).json({ error: 'Unauthorize.' })
  }

  next()
}
