import { Router } from 'express'
import { CreateCategoryController } from '../../../../modules/category/useCases/createCategory/CreateCategoryController'
import { ensureAuthentication } from '../middleware/ensureAuthentication'
import { ListCategoriesController } from '../../../../modules/category/useCases/listCategories/ListCategoriesController'

const categoryRouter = Router()
const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()

categoryRouter.post('/', ensureAuthentication, createCategoryController.handle)
categoryRouter.get('/', ensureAuthentication, listCategoriesController.handle)

export { categoryRouter }
