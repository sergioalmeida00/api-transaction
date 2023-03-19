import { Router } from 'express'
import { routerTransactions } from './transactions.routes'
import { routerUser } from './users.routes'

const router = Router()

router.use('/transactions', routerTransactions)
router.use('/user', routerUser)

export { router }
