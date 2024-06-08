import { describe, expect, it, vi } from 'vitest'
import { createCallerFactory, userRouter, userRepository } from './user'

const { login, signup } = createCallerFactory(userRouter)({})

// Here we are mocking verify function to accept "valid-token".
// Alternatively, we should consider using dependency injection to
// provide jsonwebtoken dependency.
vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(() => 'eyJ'),
    verify: vi.fn(token => {
      if (token !== 'valid-token') throw new Error('Invalid token.')

      return {
        user: { email: 'fake@user.com' },
      }
    }),
  },
}))

describe('signup', () => {
  it('creates in a user in the database', async () => {
    await signup({
      email: 'stephen@wozniak.com',
      password: 'apple.123',
    })

    const user = userRepository.find('stephen@wozniak.com')

    expect(user).toHaveProperty('password')

    // not plain text
    expect(user!.password).not.toContain('apple.123')

    // check that we are using a salt
    expect(user!.password).toHaveLength(60)

    // check that we are using bcrypt
    expect(user!.password.slice(0, 4)).toEqual(
      '$2b$'
    )
  })

  it('throws an error for invalid email', async () => {
    await expect(signup({
      email: 'not-an-email',
      password: 'some-password',
    })).rejects.toThrow(/email/)
  })

  it('stores lowercased email', async () => {
    await signup({
      email: 'joNY@IVE.cOm',
      password: 'some-password',
    })

    const user = userRepository.find('jony@ive.com')

    // Slightly redundant, but it prevents issues if we are lowercasing
    // only in the userRepository.find step.
    expect(user).toHaveProperty('email', 'jony@ive.com')
  })

  it('stores email with trimmed whitespace', async () => {
    await signup({
      email: ' \t eddy@cue.com\t   \t', // spaces and tabs
      password: 'some-password',
    })

    const user = userRepository.find('eddy@cue.com')

    expect(user).toHaveProperty('email', 'eddy@cue.com')
  })
})

describe('login', () => {
  it('returns a token if the password matches', async () => {
    await signup({
      email: 'steve@jobs.com',
      password: 'correct-password',
    })

    const { user, token } = await login({
      email: 'steve@jobs.com',
      password: 'correct-password',
    })

    expect(user).toEqual({
      email: 'steve@jobs.com',
    })
    expect(token).toEqual(expect.any(String))
    expect(token.slice(0, 3)).toEqual('eyJ')
  })


  // skipping as we are not using cookies
  it.skip('sets a cookie if the password matches', async () => {
    // A mock of the res object for this test that we can check.
    const res = {
      cookie: vi.fn(),
    }

    // A custom login/signup that uses our res mock.
    const { login, signup } = userRouter.createCaller({
      res,
    })

    await signup({
      email: 'steve@jobs.com',
      password: 'correct-password',
    })

    const { user } = await login({
      email: 'steve@jobs.com',
      password: 'correct-password',
    })

    expect(user).toEqual({
      email: 'steve@jobs.com',
    })

    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      expect.any(String),
      {
        // this should be set in production server that uses https
        // secure: true,

        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    )
  })

  it('throws an error if user does not exist', async () => {
    await expect(
      login({
        email: 'nonexistant@user.com',
        password: 'apple.321',
      })
    ).rejects.toThrow(/email/)
  })

  it('throws an error if password is incorrect', async () => {
    await signup({
      email: 'tim@cook.com',
      password: 'original-password',
    })

    await expect(
      login({
        email: 'tim@cook.com',
        password: 'wrong-password',
      })
    ).rejects.toThrow(/password/)
  })

  it('throws an error for invalid email', async () => {
    await expect(login({
      email: 'not-an-email',
      password: 'password',
    })).rejects.toThrow(/email/)
  })

  it('throws an error for a short password', async () => {
    await expect(login({
      email: 'valid@email.com',
      password: 'short',
    })).rejects.toThrow(/password/)
  })

  it('allows logging in with different email case', async () => {
    await signup({
      email: 'katherine@adams.com',
      password: 'correct-password',
    })

    // We already checked what login returns.
    // We simply check that it does not throw.
    await expect(login({
      email: 'KatheriNe@Adams.COM',
      password: 'correct-password',
    })).resolves.toEqual(expect.anything()) //
  })

  it('allows logging in with surrounding white space', async () => {
    await signup({
      email: 'katherine@adams.com',
      password: 'correct-password',
    })

    // We already checked what login returns.
    // We simply check that it does not throw.
    await expect(login({
      email: ' katherine@adams.com ',
      password: 'correct-password',
    })).resolves.toEqual(expect.anything())
  })
})

describe('change password', () => {
  // We are not adding more tests as this is not the focus of this example.
  it('changes the password', async () => {
    const { changePassword } = userRouter.createCaller({
      req: {
        header: () => `Bearer valid-token`,
      },
    })

    await signup({
      email: 'fake@user.com',
      password: 'original-password',
    })

    const { password: passwordOriginal } = userRepository.find('fake@user.com')!

    await changePassword({
      email: 'fake@user.com',
      password: 'password-new',
    })

    const { password: passwordNew } = userRepository.find('fake@user.com')!

    expect(passwordOriginal).not.toEqual(passwordNew)
    expect(passwordNew.slice(0, 4)).toEqual('$2b$')
  })
})
