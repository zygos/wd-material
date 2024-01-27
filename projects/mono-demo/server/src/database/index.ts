import 'dotenv/config'
import { join } from 'path'
import { DataSource } from 'typeorm'

export default function createDatabase(url: string) {
  return new DataSource({
    type: 'sqlite',
    database: join(__dirname, '../..', url),
    logging: true,
    entities: [
      join(__dirname, './entities/**/*.ts'),
    ],
    migrations: [
      join(__dirname, './migrations/**/*.ts'),
    ],
    // synchronize: true,
  })
}

export type Database = DataSource

export * from './entities'
