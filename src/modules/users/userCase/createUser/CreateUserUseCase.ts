import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/IUserRepository'
import { ICreateUserDTO } from './ICreateUserDTO'
import { hash } from 'bcryptjs'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('KnexUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ login, email, password }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8)
    const emailExists = await this.userRepository.findByEmail(email)

    if (emailExists) {
      throw new Error('E-mail already registered')
    }

    await this.userRepository.create({ login, email, password: passwordHash })
  }
}
