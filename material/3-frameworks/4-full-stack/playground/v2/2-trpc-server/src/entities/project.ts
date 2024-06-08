import { z } from 'zod'
import type { Insertable, Updateable } from 'kysely'
import type { Project } from '@server/database/types'

export const projectBase = z.object({
  name: z.string().trim(),
  userId: z.number().int().positive(),
})

export const projectInsert = projectBase satisfies z.ZodSchema<
  Insertable<Project>
>

export const projectUpdate = projectBase
  // disallow updating
  .omit({ userId: true })

  // allow passing any subset of the fields
  .partial() satisfies z.ZodSchema<Updateable<Project>>
