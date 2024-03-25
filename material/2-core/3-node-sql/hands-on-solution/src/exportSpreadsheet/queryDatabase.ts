import { type Database } from '../database'
import { type Spreadsheet } from '../schemas/spreadsheet'

type SpreadsheetStored = Omit<Spreadsheet, 'size'> & {
  length: number
  width: number
  height: number
}

export default async (database: Database): Promise<Spreadsheet[]> => {
  const selects = [
    // package
    'package.id AS package_id, package.description AS package_description, package.weight, package.length, package.width, package.height, package.size_unit',

    // customer
    'customer.id AS customer_id, customer.name AS customer_name',

    // driver
    'driver.id AS driver_id, driver.name AS driver_name, driver.license_number',

    // pickup address
    'pickup_address.id AS pickup_address_id, pickup_address.name AS pickup_address_name, pickup_address.address_full AS pickup_address_full',

    // delivery address
    'delivery_address.id AS delivery_address_id, delivery_address.name AS delivery_address_name, delivery_address.address_full AS delivery_address_full',

    // package delivery timestamps
    'package.pickup_at, package.delivered_at',

    // invoice
    'invoice.id AS invoice_id, invoice.serial_number AS invoice_serial_number, invoice.amount AS invoice_amount, invoice.currency, invoice.invoiced_at, invoice.paid_at',
  ].join(', ')

  const rows = database
    .prepare(
      [
        `SELECT ${selects}`,
        `FROM package`,
        `LEFT JOIN customer ON package.customer_id = customer.id`,
        `LEFT JOIN driver ON package.driver_id = driver.id`,
        `LEFT JOIN address AS pickup_address ON package.pickup_address_id = pickup_address.id`,
        `LEFT JOIN address AS delivery_address ON package.delivery_address_id = delivery_address.id`,
        `LEFT JOIN invoice ON package.invoice_id = invoice.id`,
      ].join('\n'),
    )
    .all() as SpreadsheetStored[]

  return rows.map(({ length, width, height, ...row }) => ({
    ...row,
    size: `${length}x${width}x${height}`,
  }))
}
