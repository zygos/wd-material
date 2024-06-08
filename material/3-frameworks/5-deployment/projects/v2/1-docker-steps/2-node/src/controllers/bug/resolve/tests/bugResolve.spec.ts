import { authContext } from '@tests/utils/context'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import bugRouter from '../..'
import setupBugTest from './setup'

// Example of testing with a database. This can deliver more
// confidence that our project works as expected, but it's also
// trickier to set up and maintain if we have relationships and
// constraints in the database.
// For example, now we have to create a user and a project in the
// database just to be able to create a bug. To encapsulate this
// setup, we have moved it to a separate function - setupBugTest.
const db = await wrapInRollbacks(createTestDatabase())
const {
  bugs: [bug, bugBelongingToAnotherUser],
  user,
} = await setupBugTest(db)

const createCaller = createCallerFactory(bugRouter)
const { resolve } = createCaller(authContext({ db }, user))

// Example with a mocked database
it('should set a bug as resolved', async () => {
  // ACT (When)
  const bugResolved = await resolve(bug)

  // ASSERT (Then)
  expect(bugResolved).toMatchObject({
    id: bug.id,

    // should be a date, we would need to go out of our way to make it not current date
    resolvedAt: expect.any(Date),
  })
})

it('should throw an error if bug is not found', async () => {
  // ACT (When) & ASSERT (Then)
  await expect(
    resolve({
      ...bug,
      id: bug.id + 12345,
    })
  ).rejects.toThrow(/not found/i)
})

it('should throw an error if user does not own the bug', async () => {
  // ACT (When) & ASSERT (Then)
  await expect(resolve(bugBelongingToAnotherUser)).rejects.toThrow(
    /does not belong/i
  )
})
