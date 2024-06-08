import type { Database } from '@server/database'
import type { User } from '@server/database/types'
import type { Insertable, Selectable } from 'kysely'

export function userRepository(db: Database) {
  return {
    async create(user: Insertable<User>): Promise<Selectable<User>> {
      return db
        .insertInto('user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()
    },

    async findByEmail(email: string): Promise<Selectable<User> | undefined> {
      const user = await db
        .selectFrom('user')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst()

      return user
    },
  }
}
