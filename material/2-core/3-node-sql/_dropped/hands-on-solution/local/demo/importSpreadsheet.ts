import { csv2json } from 'json-2-csv'

export default async function importSpreadsheet(database, csv) {
  const customers = await csv2json(csv)
  const values = customers.map(customer => [
    customer.customer_id,
    customer.customer_name,
  ])
  const parameters = values.map(() => '(?, ?)').join(', ')

  database
    .prepare(
      `INSERT INTO customer (id, name) VALUES ${parameters} ON CONFLICT(id) DO UPDATE SET name = EXCLUDED.name`
    )
    .run(values.flat())
}
