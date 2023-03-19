import 'reflect-metadata'
import './shared/container'
import express from 'express'
import cors from 'cors'
import { router } from './routes'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
