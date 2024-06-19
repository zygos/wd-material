import { z } from 'zod'
import type { Selectable } from 'kysely'
import type { Comment } from '@server/database/types'
import { idSchema } from './shared'
import type { UserPublic } from './user'

export const commentSchema = z.object({
  id: idSchema,
  articleId: idSchema,
  userId: idSchema,
  content: z.string().trim(),
  isSpam: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
})

export const commentKeysAll = Object.keys(
  commentSchema.shape
) as (keyof Comment)[]

export const commentKeysPublic = commentKeysAll

export type CommentPublic = Pick<
  Selectable<Comment>,
  (typeof commentKeysPublic)[number]
> & { author: UserPublic }
