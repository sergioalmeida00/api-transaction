import express from 'express'

const app = express()
app.use(express.json())

app.get('/hello', (req, res) => {
  return res.json({ message: 'hello World' })
})

app.listen(3001, () => {
  console.log('Server is Running! 🚀️🚀️')
})
