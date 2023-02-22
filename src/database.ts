import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASS,
    database: env.DATABASE_DB,
  },
  migrations: {
    tableName: 'migrations',
  },
}
export const knex = setupKnex(config)
