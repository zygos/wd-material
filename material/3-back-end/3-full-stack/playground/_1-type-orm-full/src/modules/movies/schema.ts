import { z } from 'zod'
import type { Movie } from '@server/database'

// validation schema
type Record = Movie
export const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(500),
  year: z.number().min(1).max(2100),
})

export const insertable = schema.omit({ id: true })
export const partial = insertable.partial()
export const idSchema = schema.shape.id

// matches database and validation schema keys
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
