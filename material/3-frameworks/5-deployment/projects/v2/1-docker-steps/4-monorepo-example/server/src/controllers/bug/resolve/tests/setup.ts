import type { Database } from '@server/database'
import { fakeBug, fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { insertAll } from '@tests/utils/records'

/**
 * Sets up the necessary data for testing the Bug module tests.
 */
export default async function setupBugTest(db: Database) {
  const users = await insertAll(db, 'user', [fakeUser(), fakeUser()])

  const projects = await insertAll(db, 'project', [
    fakeProject({ userId: users[0].id }),
    fakeProject({ userId: users[1].id }),
  ])

  const bugs = await insertAll(db, 'bug', [
    fakeBug({ projectId: projects[0].id }),
    fakeBug({ projectId: projects[1].id }),
    fakeBug({ projectId: projects[0].id }),
  ])

  return {
    bugs,
    project: projects[0],
    user: users[0],
  }
}
