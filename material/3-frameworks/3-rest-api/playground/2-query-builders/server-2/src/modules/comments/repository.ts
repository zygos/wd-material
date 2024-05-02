import type { Insertable } from 'kysely'
import db, { type Comment } from '@/database'

type CommentWithoutId = Omit<Comment, 'id'>

export function findAll() {
  return db.selectFrom('comment').selectAll().execute()
}

export function findByArticleId(articleId: number) {
  return db
    .selectFrom('comment')
    .selectAll()
    .where('articleId', '=', articleId)
    .execute()
}

export async function create(record: Insertable<CommentWithoutId>) {
  return db
    .insertInto('comment')
    .values(record)
    .returningAll()
    .executeTakeFirst()
}
