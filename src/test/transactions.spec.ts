import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 3000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 3000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set-cookie')

    const listTransactionsResponse = await request(app)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.newTransactionsFormat).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 3000,
      }),
    ])
  })

  it('should be able to get specific transaction', async () => {
    const createTransactionResponse = await request(app)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 3000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set-cookie')

    const listTransactionsResponse = await request(app)
      .get('/transactions')
      .set('Cookie', cookies)

    const idTransaction =
      listTransactionsResponse.body.newTransactionsFormat[0].id

    const getTransaction = await request(app)
      .get(`/transactions/${idTransaction}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransaction.body.transaction).toHaveProperty('id')
    expect(getTransaction.body.transaction).toHaveProperty('title')
    expect(getTransaction.body.transaction).toHaveProperty('amount')
    expect(getTransaction.body.transaction).toHaveProperty('session_id')
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 3000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('set-cookie')

    await request(app).post('/transactions').set('Cookie', cookies).send({
      title: 'Debit Transaction',
      amount: 700,
      type: 'debit',
    })

    const summaryResponse = await request(app)
      .get('/transactions/summary/balance')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summaryBalance).toEqual(
      expect.objectContaining({
        totalIncome: 3000,
        totalExpense: -700,
        totalBalance: 2300,
      }),
    )
  })
})
