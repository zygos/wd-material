import { expect, it } from 'vitest'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import importCsv from '../importCsv'
import { createTestDatabaseWithTables } from '../../database'

type Total = { id: never; total: string }

it('should save given records to a database', async () => {
  const database = await createTestDatabaseWithTables()

  const path = join(__dirname, './fixtures/exported.csv')
  const csv = await readFile(path, 'utf-8')

  await importCsv(database, csv)

  const count = async (table: string) =>
    (await database.queryAll<Total>(`SELECT COUNT(*) total FROM ${table}`))[0]
      .total

  expect(await count('address')).toBe(16)
  expect(await count('customer')).toBe(6)
  expect(await count('driver')).toBe(4)
  expect(await count('invoice')).toBe(9)
  expect(await count('package')).toBe(10)
})
