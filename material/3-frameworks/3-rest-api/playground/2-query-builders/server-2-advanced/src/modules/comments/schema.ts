import { z } from 'zod'
import type { Comment } from '@/database'

// validation schema
type Record = Comment
const schema = z.object({
  id: z.coerce.number().int().positive(),
  articleId: z.number().int().positive(),
  userId: z.number().int().positive(),

  // ~16K words, no empty strings
  content: z.string().min(1).max(100000),

  createdAt: z.date(),
})

// schema version for inserting new records
const insertable = schema.omit({
  id: true,
  createdAt: true,
})

// schema version for updating existing records
const updateable = schema
  .omit({
    id: true,
    articleId: true,
    userId: true,
    createdAt: true,
  })
  .partial()

export const parse = (record: unknown) => schema.parse(record)
export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertable = (record: unknown) => insertable.parse(record)
export const parseUpdateable = (record: unknown) => updateable.parse(record)

// ensures there are no additional keys in the schema
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
