import { authContext } from '@tests/utils/context'
import bugRouter from '..'
import setupBugTest from '../tests/setup'

it('should return a list of bugs of a given project', async () => {
  // ARRANGE (Given)
  const { db, project, user } = await setupBugTest()
  const { find } = bugRouter.createCaller(authContext({ db }, user))

  // ACT (When)
  const bugsFound = await find({
    projectId: project.id,
  })

  // ASSERT (Then) - each returned bug should have the given projectId
  expect(bugsFound).toMatchObject([
    { projectId: project.id },
    { projectId: project.id },
  ])
})
