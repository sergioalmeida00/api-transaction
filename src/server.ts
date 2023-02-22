import express from 'express'
import { knex } from './database'
import { env } from './env'

const app = express()
app.use(express.json())

app.get('/hello', async (req, res) => {
  const transaction = await knex('transactions').select('*')

  return res.json(transaction)
})

app.listen(env.PORT_PROJECT, () => {
  console.log('Server is Running! 🚀️🚀️')
})
