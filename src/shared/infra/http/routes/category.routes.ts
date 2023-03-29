import { Router } from 'express'
import { CreateCategoryController } from '../../../../modules/category/useCases/createCategory/CreateCategoryController'
import { ensureAuthentication } from '../middleware/ensureAuthentication'

const categoryRouter = Router()
const createCategoryController = new CreateCategoryController()

categoryRouter.post('/', ensureAuthentication, createCategoryController.handle)

export { categoryRouter }
