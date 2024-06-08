import { authContext, authRepoContext } from '@tests/utils/context'
import { fakeBug, fakeUser } from '@server/entities/tests/fakes'
import { createCallerFactory } from '@server/trpc'
import bugRouter from '..'
import setupBugTest from '../tests/setup'

const createCaller = createCallerFactory(bugRouter)

// Example with a mocked database
it('should set a bug as resolved', async () => {
  // ARRANGE (Given)
  const user = fakeUser()
  const bug = fakeBug({
    projectId: 1,
  })

  // Example with a mocked database
  const { resolve } = createCaller(
    authRepoContext(
      {
        Project: {
          findOne: () => ({ id: 1, userId: user.id }),
        },
        Bug: {
          update: () => ({ affected: 1 }),
          findOneByOrFail: () => ({
            ...bug,
            resolvedAt: new Date(),
          }),
        },
      },
      user
    )
  )

  // ACT (When)
  const bugResolved = await resolve(bug)

  // ASSERT (Then)
  expect(bugResolved).toMatchObject({
    id: bug.id,

    // should be a date, we would need to go out of our way to make it not current date
    resolvedAt: expect.any(Date),
  })
})

// Example with a database
it('should throw an error if bug is not found', async () => {
  // ARRANGE (Given)
  const {
    db,
    bugs: [bug],
    user,
  } = await setupBugTest()
  const { resolve } = createCaller(authContext({ db }, user))

  // ACT (When) & ASSERT (Then)
  await expect(
    resolve({
      ...bug,
      id: bug.id + 12345,
    })
  ).rejects.toThrow(/not found/i)
})
