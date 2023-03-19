import { ICreateUserDTO } from '../createUser/ICreateUserDTO'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>
}

export { IUserRepository }
