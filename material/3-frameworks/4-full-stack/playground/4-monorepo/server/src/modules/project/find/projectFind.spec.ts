import { authContext } from '@tests/utils/context'
import { Project, User } from '@server/entities'
import { fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a list of projects', async () => {
  const db = await createTestDatabase()

  // a pair of users and projects to make sure we do not return other users' projects
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  await db
    .getRepository(Project)
    .save([
      fakeProject({ userId: user.id }),
      fakeProject({ userId: userOther.id }),
    ])

  const { find } = router.createCaller(authContext({ db }, user))

  // When (ACT)
  const userProjects = await find()

  // Then (ASSERT)
  expect(userProjects).toHaveLength(1)
  expect(userProjects[0]).toMatchObject({
    id: expect.any(Number),
    userId: user.id,

    // no relations
    user: undefined,
    bugs: undefined,
  })
})
