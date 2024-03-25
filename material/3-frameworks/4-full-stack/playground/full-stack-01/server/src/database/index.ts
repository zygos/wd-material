import 'dotenv/config'
import { join } from 'path'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const relative = (...paths: string[]) => join(__dirname, ...paths)

const defaults = {
  entities: [relative('./entities/**/*.ts')],
  migrations: [relative('./migrations/**/*.ts')],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  synchronize: false,
}

const isInMemory = (url: string) => url === ':memory:'

export default function createDatabase(url: string, optionsOverride: any = {}) {
  return new DataSource({
    type: 'better-sqlite3',
    database: isInMemory(url) ? url : relative('../..', url),
    ...defaults,
    ...optionsOverride,
  })
}

if (process.env.NODE_ENV !== 'test' && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env var is not set')
}

// exclusively for migrations
export const migrationDatasource = new DataSource({
  type: 'better-sqlite3',
  database: relative('../..', process.env.DATABASE_URL || ''),
  ...defaults,
})

export type Database = DataSource

export * from './entities'
