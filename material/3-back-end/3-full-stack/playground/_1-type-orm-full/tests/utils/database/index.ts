import createDatabase from '@server/database'
import { DataSourceOptions } from 'typeorm'
import getLocalEntities from './getLocalEntities'

export async function createTestDatabase(
  options: Partial<DataSourceOptions> = {},
) {
  const db = createDatabase({
    entities: getLocalEntities() as any,
    migrations: [],
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
    ...options,
  })

  return db
}
