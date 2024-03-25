import { createAuthRepoContext } from '@tests/utils/context'
import { assoc } from 'lodash/fp'
import { fakeUser } from '@server/entities/tests/fakes'
import projectRouter from '../server/src/modules/project'

// Example without creating a database and without passing
// in an entire database mock, only passing in the repo mocks
// that the procedure is explicitly asking for via our
// provideRepos utility function.

// same as vi.fn((project) => ({ ...project, id: 1 }))
const save = vi.fn(assoc('id', 1))
const user = fakeUser()

const { create } = projectRouter.createCaller(
  createAuthRepoContext({ Project: { save } }, user)
)

it('should create a persisted project', async () => {
  // ACT
  const name = 'My Special Project'
  const projectCreated = await create({
    name: 'My Special Project',
  })

  // ASSERT
  // we could split this into separate test cases
  // but this is so essential to what our procedure needs
  // to do, that we will take make both assertions.
  expect(projectCreated).toMatchObject({
    id: 1,
    name,
    userId: user.id,
  })

  // check mocked calls
  expect(save).toHaveBeenCalledWith({
    name,
    userId: user.id,
  })
})
