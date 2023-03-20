import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/IUserRepository'
import { IAuthenticateUserDTO } from './AuthenticateUserDTO'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('KnexUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ login, password }: IAuthenticateUserDTO) {
    const user = await this.userRepository.findByLogin(login)

    if (!user) {
      throw new Error('Incorrect Login/email')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Incorrect Login/email')
    }

    const token = sign(
      { id: user.id, login: user.login },
      process.env.JWT_PASS ?? '',
      { expiresIn: process.env.JWT_EXPIRE, subject: user.id },
    )

    return token
  }
}
