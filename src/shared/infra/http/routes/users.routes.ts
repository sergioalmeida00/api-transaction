import { Router } from 'express'
import { AuthenticateUserController } from '../../../../modules/users/userCase/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '../../../../modules/users/userCase/createUser/CreateUserController'

const routerUser = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

routerUser.post('/authenticate', authenticateUserController.handle)
routerUser.post('/', createUserController.handle)

export { routerUser }
