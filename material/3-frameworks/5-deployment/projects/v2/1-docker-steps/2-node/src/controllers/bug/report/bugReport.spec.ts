import { createCallerFactory } from '@server/trpc'
import bugRouter from '..'
import { authRepoContext } from '@tests/utils/context'
import { fakeBug } from '@server/entities/tests/fakes'

const createCaller = createCallerFactory(bugRouter)

// with mocked repositories
const repos = {
  projectRepository: {
    findById: vi.fn(async (id: number) => ({ id })),
  },
  bugRepository: {
    create: vi.fn(async (bug) => ({ ...bug, id: 1 })),
  },
}

const { report } = createCaller(authRepoContext(repos))

it('should save and return a bug', async () => {
  // ARRANGE (Given)
  const bug = fakeBug({ projectId: 5 })

  // ACT (When)
  const bugCreated = await report(bug)

  // ASSERT (Then)
  expect(bugCreated).toMatchObject({
    ...bug,
    id: 1,
  })

  // ignores passed in id
  expect(bugCreated.id).not.toEqual(bug.id)
})

it('should throw an error if the project does not exist', async () => {
  // ARRANGE (Given)
  const bug = fakeBug({ projectId: 5 })
  repos.projectRepository.findById.mockResolvedValueOnce(undefined as any)

  // ACT (When) & ASSERT (Then)
  await expect(report(bug)).rejects.toThrow(/not found/i)
})
