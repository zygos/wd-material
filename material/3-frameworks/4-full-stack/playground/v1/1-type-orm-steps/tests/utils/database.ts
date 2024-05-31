import createDatabase from '@shared/database'
import type { DataSourceOptions } from 'typeorm'

export async function createTestDatabase(
  options: Partial<DataSourceOptions> = {}
) {
  const db = createDatabase({
    ...options,
  })

  await db.initialize()

  return db
}

export async function createInMemoryDatabase(options = {}) {
  const db = await createTestDatabase({
    type: 'better-sqlite3',
    database: ':memory:', // use in-memory database
    synchronize: true, // initialize through schema sync
    migrations: [], // we do not need migrations for tests as we are synchronizing the schema
    logging: false, // disable logging for in-memory runs
    ...options,
  })

  return db
}
