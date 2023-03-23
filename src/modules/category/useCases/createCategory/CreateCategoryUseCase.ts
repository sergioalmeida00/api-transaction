import { inject, injectable } from 'tsyringe'
import { ICategoryRepository } from '../../repositories/ICategoryRepository'
import { IInputCategory } from './CreateCategoryDTO'

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('KnexCategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ description, type }: IInputCategory) {
    await this.categoryRepository.create({ description, type })
  }
}
