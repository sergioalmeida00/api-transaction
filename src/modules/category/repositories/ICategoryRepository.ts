import { IInputCategory } from '../useCases/createCategory/CreateCategoryDTO'
import { ListCategoriesDTO } from '../useCases/listCategories/ListCategoriesDTO'

interface ICategoryRepository {
  create({ description, type }: IInputCategory): Promise<void>
  listCategories(): Promise<ListCategoriesDTO[]>
}

export { ICategoryRepository }
