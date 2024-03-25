import { join } from 'path'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '@server/entities'

const relative = (...paths: string[]) => join(__dirname, ...paths)

export default function createDatabase(
  options: Partial<DataSourceOptions> = {}
) {
  return new DataSource({
    // defaults
    entities,
    migrations: [relative('./migrations/**/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,

    // overrides
    ...options,
  } as any)
}

export type Database = DataSource
