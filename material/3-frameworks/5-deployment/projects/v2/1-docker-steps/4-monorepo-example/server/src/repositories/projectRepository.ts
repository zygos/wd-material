import type { Database, Project } from '@server/database'
import type { Insertable, Selectable } from 'kysely'

export function projectRepository(db: Database) {
  return {
    async create(project: Insertable<Project>): Promise<Selectable<Project>> {
      return db
        .insertInto('project')
        .values(project)
        .returningAll()
        .executeTakeFirstOrThrow()
    },

    async findById(
      projectId: number
    ): Promise<Selectable<Project> | undefined> {
      return db
        .selectFrom('project')
        .selectAll()
        .where('id', '=', projectId)
        .executeTakeFirst()
    },

    async findAllByUserId(userId: number): Promise<Selectable<Project>[]> {
      return db
        .selectFrom('project')
        .selectAll()
        .where('userId', '=', userId)
        .orderBy('id', 'asc')
        .execute()
    },

    async hasUserId(projectId: number, userId: number): Promise<boolean> {
      const project = await db
        .selectFrom('project')
        .select('userId')
        .where('id', '=', projectId)
        .executeTakeFirst()

      return project?.userId === userId
    },
  }
}
