import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default function createDatabase(
  options: Readonly<Partial<DataSourceOptions>> = {}
) {
  return new DataSource({
    // defaults
    namingStrategy: new SnakeNamingStrategy(),

    // overrides
    ...options,
  } as any)
}

// type alias to refer to an internal type, over the library's
export type Database = DataSource
