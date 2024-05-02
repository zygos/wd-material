import type { Insertable, Updateable } from 'kysely'
import db, { type Article } from '@/database'

type ArticleWithoutId = Omit<Article, 'id'>

export function findAll() {
  return db.selectFrom('article').selectAll().execute()
}

export function findById(id: number) {
  return db
    .selectFrom('article')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
}

export function create(record: Insertable<ArticleWithoutId>) {
  return db
    .insertInto('article')
    .values(record)
    .returningAll()
    .executeTakeFirst()
}

export function update(id: number, partial: Updateable<ArticleWithoutId>) {
  return db
    .updateTable('article')
    .set(partial)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}

export function remove(id: number) {
  return db
    .deleteFrom('article')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
