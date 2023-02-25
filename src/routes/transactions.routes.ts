import { Router } from 'express'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { getCookies, setCookies } from '../utils/cookies'

const routerTransactions = Router()

routerTransactions.post('/', async (request, response) => {
  const createTransactionsSchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
  })

  let sessionId = getCookies(request.headers.cookie)

  if (!sessionId) {
    sessionId = setCookies('sessionId', response)
  }

  const { title, amount, type } = createTransactionsSchema.parse(request.body)

  await knex('transactions').insert({
    id: randomUUID(),
    title,
    amount: type === 'credit' ? amount : amount * -1,
    session_id: sessionId,
  })

  return response.status(201).send()
})

routerTransactions.get('/', async (request, response) => {
  const transactions = await knex('transactions').select('*')

  const newTransactionsFormat = transactions.map(
    ({ amount, ...transaction }) => ({
      ...transaction,
      amount: Number(amount),
    }),
  )

  return response.status(200).json({ newTransactionsFormat })
})

routerTransactions.get('/:id', async (request, response) => {
  const getTransactionsParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getTransactionsParamSchema.parse(request.params)

  const transaction = await knex('transactions').where('id', id).first()

  return response.status(200).json({ transaction })
})

routerTransactions.get('/summary/balance', async (request, response) => {
  const summary = await knex('transactions').select('amount')

  const summaryBalance = summary.reduce(
    ({ totalIncome, totalExpense, totalBalance }, operation) => {
      if (operation.amount > 0) {
        totalIncome += Number(operation.amount)
      } else {
        totalExpense += Number(operation.amount)
      }
      totalBalance = totalIncome + totalExpense
      return {
        totalIncome,
        totalExpense,
        totalBalance,
      }
    },
    { totalIncome: 0, totalExpense: 0, totalBalance: 0 },
  )

  return response.status(200).json({ summaryBalance })
})

export { routerTransactions }
