import { z } from 'zod'
import type { Insertable, Updateable } from 'kysely'
import type { User } from '@server/database/types'

export const userBase = z.object({
  // We will trim and lowercase all emails, otherwise
  // some users will be frustrated when they try to
  // log in with "email@example.com" while they have
  // registered with "Email@example.com ".
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8, 'Your password must be at least 8 characters long.')
    .max(64, 'Your password must be at most 64 characters long.'),
})

export const userInsert = userBase satisfies z.ZodSchema<Insertable<User>>

export const userUpdate = userBase
  // disallow updating
  .omit({ email: true })

  // allow passing any subset of the fields
  .partial() satisfies z.ZodSchema<Updateable<User>>
