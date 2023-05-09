import { knex } from '../../../../../database'
import { IInputCategory } from '../../../useCases/createCategory/CreateCategoryDTO'
import { ListCategoriesDTO } from '../../../useCases/listCategories/ListCategoriesDTO'
import { ICategoryRepository } from '../../ICategoryRepository'

export class KnexCategoryRepository implements ICategoryRepository {
  async create({ description, type }: IInputCategory): Promise<void> {
    await knex('category').insert({
      description,
      type,
    })
  }

  async listCategories(): Promise<ListCategoriesDTO[]> {
    const listCategories = await knex('category').select('*')

    return listCategories
  }
}
