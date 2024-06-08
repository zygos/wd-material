import { createCallerFactory } from '@server/trpc'
import { NoResultError } from 'kysely'
import bugRouter from '..'

const createCaller = createCallerFactory(bugRouter)

// Example of testing with mocked repositories.
const repos = {
  projectRepository: {
    hasUserId: vi.fn(async () => true),
  },
  bugRepository: {
    update: vi.fn(async (id, bug) => ({ id, ...bug })),
  },
}

const { resolve } = createCaller({
  authUser: { id: 1 },
  repos,
} as any)

const bug = { id: 14, projectId: 24 }

// Example with a mocked database
it('should set a bug as resolved', async () => {
  // ACT (When)
  const bugResolved = await resolve(bug)

  // ASSERT (Then)
  expect(bugResolved).toMatchObject({
    id: bug.id,
    resolvedAt: expect.any(Date),
  })
})

it('should throw an error if bug is not found', async () => {
  // if update throws a Kysely NoResultError error
  repos.bugRepository.update.mockRejectedValueOnce(new NoResultError({} as any))

  // ACT (When) & ASSERT (Then)
  await expect(resolve(bug)).rejects.toThrow(/not found/i)
})

it('should throw an error if user does not own the bug project', async () => {
  // if hasUserId returns false
  repos.projectRepository.hasUserId.mockResolvedValueOnce(false)

  // ACT (When) & ASSERT (Then)
  await expect(resolve(bug)).rejects.toThrow(/does not belong/i)
})
