import { app } from './app'
import { env } from './env'

app.listen(env.PORT_PROJECT, () => {
  console.log('Server is Running! 🚀️🚀️')
})
