import { container } from 'tsyringe'
import { ICategoryRepository } from '../../modules/category/repositories/ICategoryRepository'
import { KnexCategoryRepository } from '../../modules/category/repositories/implementations/knex/KnexCategoryRepository'
import { KnexTransactionRepository } from '../../modules/transactions/repositories/implementations/knex/KnexTransactionRepository'
import { ITransactionRepository } from '../../modules/transactions/repositories/ITransactionRepository'
import { KnexUserRepository } from '../../modules/users/userCase/repositories/implementations/knex/KnexUserRepository'
import { IUserRepository } from '../../modules/users/userCase/repositories/IUserRepository'

container.registerSingleton<IUserRepository>(
  'KnexUserRepository',
  KnexUserRepository,
)

container.registerSingleton<ITransactionRepository>(
  'KnexTransactionRepository',
  KnexTransactionRepository,
)

container.registerSingleton<ICategoryRepository>(
  'KnexCategoryRepository',
  KnexCategoryRepository,
)
