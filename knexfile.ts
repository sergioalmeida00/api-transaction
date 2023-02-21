import 'dotenv/config'
import { Knex } from 'knex'

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB,
  },
  migrations: {
    tableName: 'migrations',
  },
}
export default config
