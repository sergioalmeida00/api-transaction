import { container } from 'tsyringe'
import { KnexUserRepository } from '../../modules/users/userCase/repositories/implementations/knex/KnexUserRepository'
import { IUserRepository } from '../../modules/users/userCase/repositories/IUserRepository'

import { KnexTransactionRepository } from '../../modules/transactions/repositories/implementations/knex/KnexTransactionRepository'
import { ITransactionRepository } from '../../modules/transactions/repositories/ITransactionRepository'
import { ICategoryRepository } from '../../modules/category/repositories/ICategoryRepository'
import { KnexCategoryRepository } from '../../modules/category/repositories/implementations/knex/KnexCategoryRepository'

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
