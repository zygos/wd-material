import { it, expect } from 'vitest'
import sqlite from 'better-sqlite3'
import createTables from './createTables'
import importSpreadsheet from './importSpreadsheet'

it('should update existing customer without modifying other customers', async () => {
  // create database with tables
  const database = sqlite(':memory:')
  createTables(database)

  // import data from a CSV string
  const csv1 = 'customer_id,customer_name\n1,John Doe\n2,Jane Doe'
  await importSpreadsheet(database, csv1)

  // update data in the database with a partial update
  const csv2 = 'customer_id,customer_name\n1,Johnny Doe'
  await importSpreadsheet(database, csv2)

  // check if the data was imported correctly
  const customers = database.prepare('SELECT * FROM customer').all()
  expect(customers).toEqual([{
    id: 1,
    name: 'Johnny Doe',
  }, {
    id: 2,
    name: 'Jane Doe',
  }])
})