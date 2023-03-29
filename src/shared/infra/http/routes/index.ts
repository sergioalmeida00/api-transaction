import { Router } from 'express'
import { routerTransactions } from './transactions.routes'
import { routerUser } from './users.routes'
import { categoryRouter } from './category.routes'

const router = Router()

router.use('/transactions', routerTransactions)
router.use('/user', routerUser)
router.use('/category', categoryRouter)

export { router }
