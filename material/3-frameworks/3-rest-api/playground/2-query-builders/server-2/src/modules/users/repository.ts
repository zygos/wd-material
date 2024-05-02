import type { Insertable } from 'kysely'
import db, { type User } from '@/database'

type UserWithoutId = Omit<User, 'id'>

export function create(id: Insertable<UserWithoutId>) {
  return db.insertInto('user').values(id).returningAll().executeTakeFirst()
}
