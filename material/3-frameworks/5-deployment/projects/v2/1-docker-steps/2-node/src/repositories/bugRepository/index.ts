import type { Database, Bug } from '@server/database'
import type { Insertable, Selectable, Updateable } from 'kysely'

export function bugRepository(db: Database) {
  return {
    async create(bug: Insertable<Bug>): Promise<Selectable<Bug>> {
      return db
        .insertInto('bug')
        .values(bug)
        .returningAll()
        .executeTakeFirstOrThrow()
    },

    async update(id: number, bug: Updateable<Bug>): Promise<Selectable<Bug>> {
      return db
        .updateTable('bug')
        .set(bug)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow()
    },

    async findById(bugId: number): Promise<Selectable<Bug> | undefined> {
      return db
        .selectFrom('bug')
        .selectAll()
        .where('id', '=', bugId)
        .executeTakeFirst()
    },

    async findAllByProjectId(projectId: number): Promise<Selectable<Bug>[]> {
      return db
        .selectFrom('bug')
        .selectAll()
        .where('projectId', '=', projectId)
        .orderBy('id', 'asc')
        .execute()
    },
  }
}
