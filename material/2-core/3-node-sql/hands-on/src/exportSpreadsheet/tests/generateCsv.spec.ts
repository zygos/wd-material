import { it, expect } from 'vitest'
import { csv2json } from 'json-2-csv'
import { join } from 'node:path'
import { createTestDatabase } from '../../database'
import generateCsv from '../generateCsv'
import expected from './fixtures/expected'

const database = createTestDatabase(join(__dirname, './fixtures/database.db'), {
  readonly: true,
})

it('should an expected column order', async () => {
  const csv = await generateCsv(database)
  const header = csv.slice(0, csv.indexOf('\n'))

  expect(header).toEqual(
    [
      'package_id',
      'package_description',
      'weight',
      'size',
      'size_unit',
      'customer_id',
      'customer_name',
      'driver_id',
      'driver_name',
      'license_number',
      'pickup_address_id',
      'pickup_address_name',
      'pickup_address_full',
      'delivery_address_id',
      'delivery_address_name',
      'delivery_address_full',
      'pickup_at',
      'delivered_at',
      'invoice_id',
      'invoice_serial_number',
      'invoice_amount',
      'currency',
      'invoiced_at',
      'paid_at',
    ].join(','),
  )
})

it('should return all results in the CSV format', async () => {
  const csv = await generateCsv(database)

  // checking through json to make the test messages more readable
  // and independent of the order of the columns once the header is checked
  const parsed = await csv2json(csv)

  // map to strings due to too eager type conversion in json-2-csv
  const rows = parsed.map(toStrings(['license_number']))

  expect(rows).toHaveLength(10)
  expect(rows).toMatchObject(expected)
})

function toStrings(keys: string[]) {
  return (row: object) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => {
        if (keys.includes(key)) {
          return value === null ? [key, ''] : [key, String(value)]
        }

        return [key, value]
      }),
    )
}
