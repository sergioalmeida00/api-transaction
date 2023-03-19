import { container } from 'tsyringe'
import { KnexUserRepository } from '../../modules/users/userCase/repositories/implementations/knex/KnexUserRepository'
import { IUserRepository } from '../../modules/users/userCase/repositories/IUserRepository'

container.registerSingleton<IUserRepository>(
  'KnexUserRepository',
  KnexUserRepository,
)
