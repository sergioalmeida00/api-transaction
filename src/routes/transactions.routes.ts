import { Router } from 'express'

import { CreateTransactionsController } from '../modules/transactions/useCases/createTransactions/CreateTransactionsController'
import { GetAllTransactionsController } from '../modules/transactions/useCases/getAllTransactions/GetAllTransactionsController'
import { TransactionByIdController } from '../modules/transactions/useCases/transactionById/TransactionByIdController'
import { SummaryTransactionsController } from '../modules/transactions/useCases/summaryTransactions/SummaryTransactionsController'
import { SummaryTransactionTypeCategoryController } from '../modules/transactions/useCases/summaryTransactionTypeCategory/summaryTransactionTypeCategoryController'
import { ensureAuthentication } from '../middleware/ensureAuthentication'

const routerTransactions = Router()

const createTransactionsController = new CreateTransactionsController()
const getAllTransactionsController = new GetAllTransactionsController()
const transactionByIdController = new TransactionByIdController()
const summaryTransactionsController = new SummaryTransactionsController()
const summaryTransactionTypeCategoryController =
  new SummaryTransactionTypeCategoryController()

routerTransactions.post(
  '/',
  ensureAuthentication,
  createTransactionsController.handle,
)

routerTransactions.get(
  '/',
  ensureAuthentication,
  getAllTransactionsController.handle,
)

routerTransactions.get(
  '/:id',
  ensureAuthentication,
  transactionByIdController.handle,
)

routerTransactions.get(
  '/summary/balance',
  ensureAuthentication,
  summaryTransactionsController.handle,
)

routerTransactions.get(
  '/summary/type',
  ensureAuthentication,
  summaryTransactionTypeCategoryController.handle,
)
export { routerTransactions }
