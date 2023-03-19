import { Router } from 'express'
import { CreateUserController } from '../modules/users/userCase/createUser/CreateUserController'

const routerUser = Router()
const createUserController = new CreateUserController()

routerUser.post('/', createUserController.handle)

export { routerUser }
