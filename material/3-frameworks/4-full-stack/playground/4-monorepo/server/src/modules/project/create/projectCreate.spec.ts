import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import { createCallerFactory } from '@server/trpc'
import projectRouter from '..'

const createCaller = createCallerFactory(projectRouter)

it('should create a persisted project', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = createCaller(authContext({ db }, user))

  // ACT
  const projectCreated = await create({
    name: 'My Special Project',
  })

  // ASSERT
  expect(projectCreated).toMatchObject({
    id: expect.any(Number),
    name: 'My Special Project',
    userId: user.id,
  })
})
