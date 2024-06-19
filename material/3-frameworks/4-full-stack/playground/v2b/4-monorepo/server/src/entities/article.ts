import { z } from 'zod'
import type { Selectable } from 'kysely'
import type { Article } from '@server/database/types'
import { idSchema } from './shared'

export const articleSchema = z.object({
  id: idSchema,
  title: z.string().min(1).max(500),
  content: z.string().min(1).max(100000),
  userId: idSchema,
})

export const articleKeysAll = Object.keys(
  articleSchema.shape
) as (keyof Article)[]

export const articleKeysPublic = articleKeysAll

export type ArticlePublic = Pick<
  Selectable<Article>,
  (typeof articleKeysPublic)[number]
>
