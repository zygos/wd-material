import { createTestDatabase } from './createTestDatabase'

const rollbackMessage = 'Expected rollback error'

export function rollbacked<T>(
  db: Kysely<T>,
  fn: (trx: Transaction<T>) => unknown
) {
  return async () => {
    try {
      await db.transaction().execute(async (trx) => {
        await fn(trx)

        throw new Error(rollbackMessage)
      })
    } catch (error) {
      if (error instanceof Error && error.message === rollbackMessage) return

      throw error
    }
  }
}

// A slight optimization to avoid creating a new connection pool for each test.
// This should be used only for tests.
let databaseCached: Kysely<any> | undefined

export function rollbackedTest<T>(fn: (trx: Transaction<T>) => unknown) {
  return async () => {
    if (!databaseCached) {
      databaseCached = createTestDatabase()
    }

    try {
      await databaseCached.transaction().execute(async (trx) => {
        await fn(trx)

        throw new Error(rollbackMessage)
      })
    } catch (error) {
      if (error instanceof Error && error.message === rollbackMessage) return

      throw error
    }
  }
}
