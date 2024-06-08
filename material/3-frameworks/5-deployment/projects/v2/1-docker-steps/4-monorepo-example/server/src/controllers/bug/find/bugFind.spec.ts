import { authRepoContext } from '@tests/utils/context'
import { createCallerFactory } from '@server/trpc'
import bugRouter from '..'

const createCaller = createCallerFactory(bugRouter)

// Example of simple mocked repositories, which allows skipping the database
// setup altogether. This is an alternative to using a database in tests.
const repos = {
  projectRepository: {
    // Wrapping a function in vi.fn(...) adds various utility mocking functions
    // that can be used to provide a different return value for each call.
    // Here, we specify that hasUserId should return true by default.
    hasUserId: vi.fn(async () => true),
  },
  bugRepository: {
    findAllByProjectId: async (projectId: string) => [
      { id: 1, projectId },
      { id: 2, projectId },
    ],
  },
}

const { find } = createCaller(authRepoContext(repos))

it('should return a list of bugs of a given project', async () => {
  // ARRANGE (Given)
  const projectId = 5

  // ACT (When)
  const bugsFound = await find({ projectId })

  // ASSERT (Then)
  expect(bugsFound).toMatchObject([{ projectId }, { projectId }])
})

it('should throw an error if the user does not have access to the project', async () => {
  // ARRANGE (Given)
  // For this test, we will test what happens if projectRepository.hasUserId returns false
  repos.projectRepository.hasUserId.mockResolvedValueOnce(false)

  // ACT & ASSERT (When & Then)
  // Now, we expect an error and not the list of bugs
  await expect(find({ projectId: 5 })).rejects.toThrow(/does not belong/i)
})
