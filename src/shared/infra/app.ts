import 'reflect-metadata'
import '../container'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './http/routes'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
