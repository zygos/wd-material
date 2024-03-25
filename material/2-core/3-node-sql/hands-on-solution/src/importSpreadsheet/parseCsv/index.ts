import { csv2json } from 'json-2-csv'
import { mapValues } from 'lodash/fp'
import { z } from 'zod'

export default async <T extends z.ZodTypeAny>(schema: T, csv: string) => {
  const csvClean = removeEmptyLines(csv)
  const parsed = await csv2json(csvClean)
  const rows = parsed.map(row => mapValues(emptyToNull, row))

  return rows.map(row => schema.parse(row) as z.infer<T>)
}

function emptyToNull<T>(value: T): T | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null
  if (value === '') return null

  return value
}

function removeEmptyLines(csv: string) {
  return csv
    .replace(/\r/g, '') // remove carriage returns common in Windows CSVs
    .split('\n')
    .filter(line => line.length)
    .join('\n')
}
