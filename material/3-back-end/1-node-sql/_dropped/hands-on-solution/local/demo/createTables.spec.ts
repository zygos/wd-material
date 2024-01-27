/* createTables/createTables.spec.ts */
import { it, expect } from 'vitest'
import sqlite from 'better-sqlite3'
import createTables from './createTables'

it('creates a customer table', () => {
  // we create a database for the test
  const database = sqlite(':memory:')

  // we run the function which will create all tables
  createTables(database)

  // we check if the table exists, otherwise this statement will throw an error
  const customers = database
    .prepare(`SELECT * FROM customer`)
    .all()

  expect(customers).toEqual([])
})
