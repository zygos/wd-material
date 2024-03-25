import createDatabase from '@server/database'
import type { DataSourceOptions } from 'typeorm'

export async function createTestDatabase(
  options: Partial<DataSourceOptions> = {}
) {
  const db = createDatabase({
    type: 'better-sqlite3',
    database: ':memory:', // use in-memory database
    synchronize: true, // initialize through schema sync
    migrations: [], // we do not need migrations for tests as we are synchronizing the schema
    logging: false, // disable logging for in-memory runs
    ...options,
  } as any)

  await db.initialize()

  return db
}
