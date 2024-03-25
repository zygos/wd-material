import { expect, it, vi } from 'vitest'
import { authenticatedProcedure } from './authenticatedProcedure'
import { AuthUser, router } from './trpc'

const INVALID_TOKEN = 'invalid-token'
const VALID_TOKEN = 'valid-token'

// We could use dependency injection to provide jsonwebtoken dependency.
// Here we are mocking for a slightly uglier test, but easier to understand
// solution.
vi.mock('jsonwebtoken', () => ({
  default: {
    verify: (token: string) => {
      if (token !== VALID_TOKEN) throw new Error('Invalid token.')

      return {
        user: { id: 2, email: 'valid@email.com' } as AuthUser
      }
    },
  }
}))

const routes = router({
  testCall: authenticatedProcedure.query(() => 'passed'),
})

it('should pass if user is already authenticated', async () => {
  const authenticated = routes.createCaller({
    authUser: {
      id: 1,
      email: 'some@user.com',
    },
  })

  const response = await authenticated.testCall()

  expect(response).toEqual('passed')
})

it('should pass if user provides a valid token', async () => {
  const usingValidToken = routes.createCaller({
    req: {
      header: () => `Bearer ${VALID_TOKEN}`,
    },
  })

  const response = await usingValidToken.testCall()

  expect(response).toEqual('passed')
})

it('should throw an error if user does not provide a token', async () => {
  const unauthenticated = routes.createCaller({
    req: {
      header: () => undefined,
    },
  })

  await expect(unauthenticated.testCall()).rejects.toThrow(
    // any authentication-like error
    /login|log in|logged in|authenticate|unauthorized/i
  )
})

it('should throw an error if it is run without access to headers', async () => {
  const invalidToken = routes.createCaller(
    {
      req: undefined as any,
    }
  )

  await expect(invalidToken.testCall()).rejects.toThrow(/Express/i)
})

it('should throw an error if user provides invalid token', async () => {
  const invalidToken = routes.createCaller(
    {
      req: {
        header: () => `Bearer ${INVALID_TOKEN}`,
      },
    }
  )

  await expect(invalidToken.testCall()).rejects.toThrow(/token/i)
})
