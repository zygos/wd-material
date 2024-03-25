import { authContext } from '@tests/utils/context'
import { fakeBug } from '@server/entities/tests/fakes'
import bugRouter from '..'
import setupBugTest from '../tests/setup'

it('should save and return a bug', async () => {
  // ARRANGE (Given)
  const { db, project, user } = await setupBugTest()
  const { report } = bugRouter.createCaller(authContext({ db }, user))

  // ACT (When)
  const bug = fakeBug({ projectId: project.id })
  const bugCreated = await report(bug)

  // ASSERT (Then)
  expect(bugCreated).toMatchObject({
    ...bug,
    id: expect.any(Number),
  })

  // ignores passed in id
  expect(bugCreated.id).not.toEqual(bug.id)
})
