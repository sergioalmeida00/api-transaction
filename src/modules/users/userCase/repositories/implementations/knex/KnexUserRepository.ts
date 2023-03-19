import { ICreateUserDTO } from '../../../createUser/ICreateUserDTO'
import { IUserRepository } from '../../IUserRepository'
import { knex } from '../../../../../../database'

export class KnexUserRepository implements IUserRepository {
  async create({ login, email, password }: ICreateUserDTO): Promise<void> {
    await knex('users').insert({
      login,
      email,
      password,
    })
  }
}
