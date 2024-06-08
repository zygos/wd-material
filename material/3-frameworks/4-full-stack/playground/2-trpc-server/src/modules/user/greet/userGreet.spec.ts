import { createCallerFactory } from '@server/trpc'
import userRouter from '..'

const createCaller = createCallerFactory(userRouter)
const { greet } = createCaller({} as any)

it('should greet a user by a provided name', async () => {
  // input = 'Sofia'
  const greeting = await greet('Sofia')

  expect(greeting).toEqual('Hello, Sofia')
})
