// import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'
import { join } from 'path'

export default new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL as string,
  logging: true,
  entities: [join('./entities/**/*.ts')],
  migrations: [join('./migrations/**/*.ts')],
  synchronize: true,
})
