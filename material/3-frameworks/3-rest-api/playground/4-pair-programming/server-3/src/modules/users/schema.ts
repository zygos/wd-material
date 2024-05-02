import { z } from 'zod'
import type { User } from '@/database'

// validation schema
type Record = User
const schema = z.object({
  id: z.coerce.number().int().positive(),
  firstName: z.string().min(1).max(500),
  lastName: z.string().min(1).max(500),
})

// parsers for validating and coercing data
const insertable = schema.omit({
  id: true,
})
const partial = insertable.partial()

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parse = (record: unknown) => schema.parse(record)
export const parseInsertable = (record: unknown) => insertable.parse(record)
export const parsePartial = (record: unknown) => partial.parse(record)

// matches database and validation schema keys
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
