import { knex } from '../../../../../database'
import { IInputCategory } from '../../../useCases/createCategory/CreateCategoryDTO'
import { ICategoryRepository } from '../../ICategoryRepository'

export class KnexCategoryRepository implements ICategoryRepository {
  async create({ description, type }: IInputCategory): Promise<void> {
    await knex('category').insert({
      description,
      type,
    })
  }
}
