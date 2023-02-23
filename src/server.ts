import express from 'express'
import { env } from './env'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)

app.listen(env.PORT_PROJECT, () => {
  console.log('Server is Running! 🚀️🚀️')
})
