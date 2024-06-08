import { z } from 'zod'
import { createCallerFactory, publicProcedure, router } from '..'
import provideRepos from '.'

const db = {} as any
const userRepositoryBuilder = vi.fn(() => {}) as any

const routes = router({
  testCall: publicProcedure
    .use(provideRepos({ userRepository: userRepositoryBuilder }))
    .input(z.object({}))
    .query(() => 'ok'),
})

afterEach(() => {
  vi.resetAllMocks()
})

it('provides repos', async () => {
  const ctx = {
    db,
  }

  const caller = createCallerFactory(routes)
  const { testCall } = caller(ctx as any)

  expect(await testCall({})).toEqual('ok')
  expect(userRepositoryBuilder).toHaveBeenCalledWith(db)
})

it('skips providing repos if they are already in context', async () => {
  const ctx = {
    db,
    repos: {
      userRepository: {},
    },
  }

  const caller = createCallerFactory(routes)
  const { testCall } = caller(ctx as any)

  expect(await testCall({})).toEqual('ok')
  expect(userRepositoryBuilder).not.toHaveBeenCalled()
})
