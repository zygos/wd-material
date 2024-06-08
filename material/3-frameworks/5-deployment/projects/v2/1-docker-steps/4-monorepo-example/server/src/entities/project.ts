import { z } from 'zod'
import type { Insertable, Updateable } from 'kysely'
import type { Project } from '@server/database/types'
import { idSchema } from './shared'

export const projectBase = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Project name must be at least 2 characters long')
    .max(100),
  userId: idSchema,
})

export const projectInsert = projectBase satisfies z.ZodSchema<
  Insertable<Project>
>

export const projectUpdate = projectBase
  // disallow updating
  .omit({ userId: true })

  // allow passing any subset of the fields
  .partial() satisfies z.ZodSchema<Updateable<Project>>
