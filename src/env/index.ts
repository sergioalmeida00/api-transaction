import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_DB: z.string(),
  PORT_PROJECT: z.coerce.number().default(3001),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid variable', _env.error.format())
  throw new Error('Invalid')
}

export const env = _env.data
