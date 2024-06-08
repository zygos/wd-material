import { z } from 'zod'
import type { Insertable, Updateable } from 'kysely'
import type { Bug } from '@server/database/types'
import { idSchema } from './shared'

export const bugBase = z.object({
  projectId: idSchema,
  code: z.string().nullable().default(null),
  name: z.string().trim(),
  stacktrace: z.string().nullable().default(null),
  resolvedAt: z.date().nullable().default(null),
})

export const bugInsert = bugBase.extend({
  // force resolvedAt to be null
  resolvedAt: bugBase.shape.resolvedAt.transform(() => null),
}) satisfies z.ZodSchema<Insertable<Bug>>

export const bugUpdate = bugBase
  // disallow updating
  .omit({ projectId: true })
  // allow passing any subset of the fields
  .partial() satisfies z.ZodSchema<Updateable<Bug>>
