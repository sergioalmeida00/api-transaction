import {
  ICreateUserDTO,
  IOutPutUserDTO,
} from '../../../createUser/ICreateUserDTO'
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

  async findByEmail(email: string): Promise<IOutPutUserDTO> {
    const resultFindByEmail = await knex('users').where({ email }).first()

    return resultFindByEmail
  }

  async findByLogin(login: string): Promise<IOutPutUserDTO> {
    const user = await knex('users').where({ login }).first()

    return user
  }

  async findByIdUser(id: string): Promise<IOutPutUserDTO> {
    const user = await knex('users').where({ id }).first()

    return user
  }
}
