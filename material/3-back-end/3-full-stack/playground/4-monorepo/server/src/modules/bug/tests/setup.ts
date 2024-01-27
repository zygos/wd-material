import { createTestDatabase } from '@tests/utils/database'
import { fakeBug, fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { Bug, Project, User } from '@server/entities'

/**
 * Sets up the necessary data for testing the Bug module tests.
 */
export default async function setupBugTest() {
  const db = await createTestDatabase()

  const users = await db.getRepository(User).save([fakeUser(), fakeUser()])

  const projects = await db
    .getRepository(Project)
    .save([
      fakeProject({ userId: users[0].id }),
      fakeProject({ userId: users[1].id }),
    ])

  const bugs = await db
    .getRepository(Bug)
    .save([
      fakeBug({ projectId: projects[0].id }),
      fakeBug({ projectId: projects[1].id }),
      fakeBug({ projectId: projects[0].id }),
    ])

  return {
    db,

    bugs,
    project: projects[0],
    user: users[0],
  }
}
