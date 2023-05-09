import { inject, injectable } from 'tsyringe'
import { ICategoryRepository } from '../../repositories/ICategoryRepository'
import { ListCategoriesDTO } from './ListCategoriesDTO'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('KnexCategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<ListCategoriesDTO[]> {
    const resultCategories = await this.categoryRepository.listCategories()

    return resultCategories
  }
}
