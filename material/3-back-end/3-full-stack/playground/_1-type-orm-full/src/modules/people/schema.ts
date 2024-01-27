import { z } from 'zod'
import type { Person } from '@server/database'

// validation schema
type Record = Person
export const schema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().min(1),
  birth: z.number().int().positive().max(new Date().getFullYear()),
})

export const insertable = schema.omit({ id: true })
export const partial = insertable.partial()
export const idSchema = schema.shape.id

// matches database and validation schema keys
export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
