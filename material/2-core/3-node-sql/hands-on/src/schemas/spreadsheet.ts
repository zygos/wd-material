import { z } from 'zod'

const MAX_INT = 2147483647
const id = z.coerce.number().positive().int().lte(MAX_INT)
const name = z.string().max(100)
const address = z.string().max(500)

const dateIsoNullable = z.preprocess(value => {
  if (typeof value !== 'string') return null

  // to UTC ISO 8601
  return `${value.replace(' ', 'T')}Z`
}, z.coerce.date().nullable())

const spreadsheetFields = {
  package_id: id,
  package_description: z.string().max(4000),
  weight: z.coerce.number().positive(),
  size: z.string().regex(/^\d+x\d+x\d+$/),
  size_unit: z.enum(['inch', 'cm']),

  customer_id: id,
  customer_name: name,

  driver_id: id.nullable(),
  driver_name: name.nullable(),
  license_number: z.coerce.string().max(100).nullable(),

  pickup_address_id: id.nullable(),
  pickup_address_name: name.nullable(),
  pickup_address_full: address.nullable(),

  delivery_address_id: id.nullable(),
  delivery_address_name: name.nullable(),
  delivery_address_full: address.nullable(),

  pickup_at: dateIsoNullable,
  delivered_at: dateIsoNullable,

  invoice_id: id.nullable(),
  invoice_serial_number: z.string().max(100).nullable(),
  invoice_amount: z.coerce.number().positive().nullable(),
  currency: z
    .string()
    .regex(/^[A-Z]{2,4}$/) // ISO 4217, letters only
    .nullable(),
  invoiced_at: dateIsoNullable,
  paid_at: dateIsoNullable,
}

export const spreadsheetSchema = z.object(spreadsheetFields).strict()

export const exportColumnOrder = Object.keys(
  spreadsheetFields,
) as (keyof typeof spreadsheetFields)[]

export type Spreadsheet = z.infer<typeof spreadsheetSchema>
