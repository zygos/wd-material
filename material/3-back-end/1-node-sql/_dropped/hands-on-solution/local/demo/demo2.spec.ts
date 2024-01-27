import { it, expect } from 'vitest'
import sqlite from 'better-sqlite3'
import createTables from './createTables'
import importSpreadsheet from './importSpreadsheet'

it('should import a single customer', async () => {
  // create database with tables
  const database = sqlite(':memory:')
  createTables(database)

  // import data from a spreadsheet
  const csv = 'customer_id,customer_name\n1,John Doe'

  await importSpreadsheet(database, csv)

  // check if the data was imported correctly
  const customers = database.prepare('SELECT * FROM customer').all()
  expect(customers).toEqual([{
    id: 1,
    name: 'John Doe',
  }])
})
