import { authContext } from '@tests/utils/context'
import { fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import projectRouter from '..'

const createCaller = createCallerFactory(projectRouter)
const db = await wrapInRollbacks(createTestDatabase())

// a pair of users and projects we will use in our test cases
const [user, userOther] = await insertAll(db, 'user', [fakeUser(), fakeUser()])

const [project, projectOther] = await insertAll(db, 'project', [
  fakeProject({ userId: user.id }),
  fakeProject({ userId: userOther.id }),
])

const { get } = createCaller(authContext({ db }, user))

it('should return a project', async () => {
  // When (ACT)
  const projectResponse = await get(project.id)

  // Then (ASSERT)
  expect(projectResponse).toMatchObject(project)
})

it('should throw an error if the project does not exist', async () => {
  const nonExistantId = project.id + projectOther.id

  // When (ACT)
  await expect(get(nonExistantId)).rejects.toThrowError(/not found/i)
})

it('should throw an error if the project does not belong to the user', async () => {
  // When (ACT)
  await expect(get(projectOther.id)).rejects.toThrowError(
    /not allowed|does not belong/i
  )
})
