import { expect, it } from 'vitest'
import { createCallerFactory, userRouter, userRepository } from './user'

const { signup } = createCallerFactory(userRouter)({})

it('creates in a user in the database', async () => {
  await signup({
    email: 'stephen@wozniak.com',
    password: 'apple.123',
  })

  const user = userRepository.find('stephen@wozniak.com')

  expect(user).toHaveProperty('password', 'apple.123')
})
