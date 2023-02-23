import { Router } from 'express'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

const routerTransactions = Router()

routerTransactions.post('/', async (request, response) => {
  const createTransactionsSchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(['credit', 'debit']),
  })

  const { title, amount, type } = createTransactionsSchema.parse(request.body)

  await knex('transactions').insert({
    id: randomUUID(),
    title,
    amount: type === 'credit' ? amount : amount * -1,
  })

  return response.status(201).send()
})

routerTransactions.get('/', async (request, response) => {
  const transaction = await knex('transactions').select('*')

  return response.status(200).json(transaction)
})

export { routerTransactions }
