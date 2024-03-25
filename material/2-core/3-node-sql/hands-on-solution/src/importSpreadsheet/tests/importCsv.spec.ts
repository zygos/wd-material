import { expect, it } from 'vitest'
import importCsv from '../importCsv'
import { createTestDatabaseWithTables } from '../../database'
import packages from './fixtures/packages'

type Total = { total: string }

it('should save given records to a database', async () => {
  const database = await createTestDatabaseWithTables()

  await importCsv(database, packages)

  const count = async (table: string) =>
    (database.prepare(`SELECT COUNT(*) total FROM ${table}`).get() as Total)
      .total

  expect(await count('address')).toBe(16)
  expect(await count('customer')).toBe(6)
  expect(await count('driver')).toBe(4)
  expect(await count('invoice')).toBe(9)
  expect(await count('package')).toBe(10)
})
