import { authContext } from '@tests/utils/context'
import { fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import projectRouter from '..'

const createCaller = createCallerFactory(projectRouter)
const db = await wrapInRollbacks(createTestDatabase())

it('should return a list of projects', async () => {
  // a pair of users and projects to make sure we do not return other users' projects
  const [user, userOther] = await insertAll(db, 'user', [
    fakeUser(),
    fakeUser(),
  ])

  await insertAll(db, 'project', [
    fakeProject({ userId: user.id }),
    fakeProject({ userId: userOther.id }),
  ])

  const { find } = createCaller(authContext({ db }, user))

  // When (ACT)
  const userProjects = await find()

  // Then (ASSERT)
  expect(userProjects).toHaveLength(1)
  expect(userProjects[0]).toMatchObject({
    id: expect.any(Number),
    userId: user.id,
    name: expect.any(String),
  })
})
