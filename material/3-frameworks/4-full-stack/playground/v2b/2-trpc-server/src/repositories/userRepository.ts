import type { Database } from '@server/database'
import type { User } from '@server/database/types'
import { type UserPublic, userKeysPublic } from '@server/entities/user'
import type { Insertable } from 'kysely'

// This could be written as a class, though the difference is mostly semantic.
export function userRepository(db: Database) {
  return {
    async create(user: Insertable<User>): Promise<UserPublic> {
      return db
        .insertInto('user')
        .values(user)
        .returning(userKeysPublic)
        .executeTakeFirstOrThrow()
    },
  }
}
