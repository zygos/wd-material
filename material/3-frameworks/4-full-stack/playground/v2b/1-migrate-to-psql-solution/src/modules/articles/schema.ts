import { z } from 'zod'
import type { Article } from '@/database'

// validation schema
type Record = Article
const schema = z.object({
  // positive integer
  id: z.coerce.number().int().positive(),

  // ~100 words, no empty strings
  title: z.string().min(1).max(500),

  // ~16K words, no empty strings
  content: z.string().min(1).max(100000),
})

// schema version for inserting new records
const insertable = schema.omit({
  id: true,
})

// schema version for updating existing records
const updateable = insertable.partial()

export const parse = (record: unknown) => schema.parse(record)
export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
export const parseUpdateable = (record: unknown) => updateable.parse(record)

// ensures there are no additional keys in the schema
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
