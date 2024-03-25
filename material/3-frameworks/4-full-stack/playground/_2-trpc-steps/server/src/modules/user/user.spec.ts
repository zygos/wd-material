import { createInMemoryDatabase } from '@tests/utils/database'
import userRouter from '.'

// Create a temporary database
const db = await createInMemoryDatabase()

// Pass it as a dependency to our procedures.
const { greet } = userRouter.createCaller({ db })

it('should greet a user by name', async () => {
  const greeting = await greet('Sofia')

  expect(greeting).toEqual('Hello, Sofia')
})

// your signup test can go here
