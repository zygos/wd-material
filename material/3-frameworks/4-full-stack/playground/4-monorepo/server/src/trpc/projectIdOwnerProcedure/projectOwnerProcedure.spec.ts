import { authContext } from '@tests/utils/context'
import { createTestDatabase } from '@tests/utils/database'
import { fakeProject, fakeUser } from '@server/entities/tests/fakes'
import { User } from '@server/entities'
import { router } from '..'
import { projectIdOwnerProcedure } from '.'

const routes = router({
  testCall: projectIdOwnerProcedure.query(() => 'passed'),
})

const db = await createTestDatabase()

const [
  {
    projects: [projectOne],
    ...userOne
  },
  {
    projects: [projectTwo],
  },
] = await db.getRepository(User).save([
  fakeUser({
    projects: [fakeProject()],
  }),
  fakeUser({
    projects: [fakeProject()],
  }),
])

const authenticated = routes.createCaller(authContext({ db }, userOne))

it('should pass if project belongs to the user', async () => {
  const response = await authenticated.testCall({ projectId: projectOne.id })

  expect(response).toEqual('passed')
})

it('should throw an error if projectId is not provided', async () => {
  // casting to any to allow calling without type safe input
  await expect((authenticated.testCall as any)({})).rejects.toThrow(/project/i)
})

it('should throw an error if user provides a non-existing projectId', async () => {
  // casting to any to allow calling without type safe input
  await expect(
    (authenticated.testCall as any)({ projectId: 999 })
  ).rejects.toThrow(/project/i)
})

it('should throw an error if user provides null projectId', async () => {
  await expect(
    authenticated.testCall({ projectId: null as any })
  ).rejects.toThrow(/project/i)
})

it('should throw an error if project does not belong to the user', async () => {
  await expect(
    authenticated.testCall({ projectId: projectTwo.id })
  ).rejects.toThrow(/project/i)
})
