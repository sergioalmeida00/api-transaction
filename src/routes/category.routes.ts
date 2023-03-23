import { Router } from 'express'
import { ensureAuthentication } from '../middleware/ensureAuthentication'
import { CreateCategoryController } from '../modules/category/useCases/createCategory/CreateCategoryController'

const categoryRouter = Router()
const createCategoryController = new CreateCategoryController()

categoryRouter.post('/', ensureAuthentication, createCategoryController.handle)

export { categoryRouter }
