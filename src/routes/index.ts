import { Router } from 'express'
import { routerTransactions } from './transactions.routes'

const router = Router()

router.use('/transactions', routerTransactions)

export { router }
