import { describe, expect, it } from 'vitest'
import { createCallerFactory, userRouter, userRepository } from './user'

const { login, signup } = createCallerFactory(userRouter)({})

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
  it('returns a user if the password matches', async () => {
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
