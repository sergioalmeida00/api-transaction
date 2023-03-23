import { IInputCategory } from '../useCases/createCategory/CreateCategoryDTO'

interface ICategoryRepository {
  create({ description, type }: IInputCategory): Promise<void>
}

export { ICategoryRepository }
