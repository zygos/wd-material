import { expect, it } from 'vitest'
import { userRouter, userRepository } from './user'

const { signup } = userRouter.createCaller({})

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
