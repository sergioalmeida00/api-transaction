import { Response } from 'express'
import { randomUUID } from 'node:crypto'

export function setCookies(nameCookie: string, response: Response) {
  const sessionId = randomUUID()
  const hour = 1000 * 60 * 60 * 24 * 7 // 7 dias em milissegundos
  const expirationDate = new Date(Date.now() + hour) // Data de expiração do cookie

  // Define o cookie no cabeçalho da resposta HTTP
  response.setHeader(
    'Set-Cookie',
    `${nameCookie}=${sessionId}; Expires=${expirationDate.toUTCString()}`,
  )

  return sessionId
}

export function getCookies(
  cookies: string | undefined,
): string | undefined | Boolean {
  if (cookies) {
    const cookie = cookies.split(';').reduce((acc, curr) => {
      const [name, value] = curr.trim().split('=')
      acc[name] = value
      return acc
    }, {} as Record<string, string>)
    const cookieValue = cookie.sessionId

    return cookieValue
  } else {
    return false
  }
}
