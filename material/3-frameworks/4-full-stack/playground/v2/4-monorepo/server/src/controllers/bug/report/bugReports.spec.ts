import { createCallerFactory } from '@server/trpc'
import { authContext } from '@tests/utils/context'
import { fakeBug, fakeUser } from '@server/entities/tests/fakes'
import { insertAll, selectAll } from '@tests/utils/records'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import bugRouter from '..'

// Example of testing with a database. This can deliver more
// confidence that our project works as expected, but it's also
// trickier to set up and maintain if we have relationships and
// constraints in the database.
// For example, now we have to create a user and a project in the
// database just to be able to create a bug.
const createCaller = createCallerFactory(bugRouter)
const db = await wrapInRollbacks(createTestDatabase())

const [userOwner, userOther] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])
const [project] = await insertAll(db, 'project', {
  name: 'My Project',
  userId: userOwner.id,
})

it('allows reporting a bug', async () => {
  // ARRANGE (Given)
  const { report } = createCaller(authContext({ db }, userOwner))
  const bug = fakeBug({ projectId: project.id })

  // ACT (When)
  const bugReturned = await report(bug)
  const [bugSaved] = await selectAll(db, 'bug', (eb) =>
    eb('id', '=', bugReturned.id)
  )

  expect(bugReturned).toEqual(bugSaved)
})

it('throws an error if the project does not exist', async () => {
  // ARRANGE (Given)
  const bug = fakeBug({ projectId: project.id + 9999 })
  const { report } = createCaller(authContext({ db }))

  // ACT (When) & ASSERT (Then)
  await expect(report(bug)).rejects.toThrow(/not found/i)
})

describe('permissions', () => {
  const bug = fakeBug({ projectId: project.id })

  it('allows reporting a bug for the project owner', async () => {
    // ARRANGE (Given)
    const { report } = createCaller(authContext({ db }, userOwner))

    // ACT (When)
    await expect(report(bug)).resolves.toMatchObject(bug)
  })

  it('allows other users to report a bug', async () => {
    // ARRANGE (Given)
    const { report } = createCaller(authContext({ db }, userOther))

    // ACT (When)
    await expect(report(bug)).resolves.toMatchObject(bug)
  })

  it('allows non-logged in users to report a bug', async () => {
    // ARRANGE (Given)
    const { report } = createCaller({ db })

    // ACT (When)
    await expect(report(bug)).resolves.toMatchObject(bug)
  })
})
