import { expect, it } from 'vitest'
import { createCallerFactory, userRouter, userRepository } from './user'

const { signup } = createCallerFactory(userRouter)({})

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
  expect(user!.password).toHaveLength(64)

  // check that we are using a salt
  expect(user!.password).not.toEqual(
    '7dd9556a50187cf3d2cf4c6c64307bc2cd2140746e10e5bf176cbeadc22f7bb8'
  )
})
