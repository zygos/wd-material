import { z } from 'zod'

// validation schema
const schema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  content: z.string(),
})

// parsers for validating and coercing data
const insertable = schema.omit({ id: true })
const partial = insertable.partial()

export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
export const parsePartial = (record: unknown) => partial.parse(record)
