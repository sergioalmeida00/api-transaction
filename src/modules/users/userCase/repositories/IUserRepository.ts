import { ICreateUserDTO, IOutPutUserDTO } from '../createUser/ICreateUserDTO'

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<IOutPutUserDTO>
}

export { IUserRepository }
