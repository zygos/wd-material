import type { Database, Comment } from '@server/database'
import { type CommentPublic, commentKeysPublic } from '@server/entities/comment'

export function commentRepository(db: Database) {
  return {}
}

export type commentRepository = ReturnType<typeof commentRepository>
