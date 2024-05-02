import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '@server/entities'

const directory = join(fileURLToPath(import.meta.url), '..')
const relative = (...paths: string[]) => join(directory, ...paths)

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
