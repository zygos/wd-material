import { join } from 'node:path'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const relative = (...paths: string[]) => join(__dirname, ...paths)

export default function createDatabase(
  options: Partial<DataSourceOptions> = {}
) {
  return new DataSource({
    // defaults
    entities: [relative('./entities/**/*.ts')],
    migrations: [relative('./migrations/**/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,

    // overrides
    ...options,
  } as any)
}

export type Database = DataSource

export * from './entities'
