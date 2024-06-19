import { createCallerFactory } from '@server/trpc'
import userRouter from '..'

const createCaller = createCallerFactory(userRouter)

it('should greet a user by provided name', async () => {
  // tRPC demands a context object to be passed to the caller.
  // The context object must match the TypeScript type provided
  // in the trpc/index.ts file. This type includes a database.
  // While that is a reasonable requirement for most of the
  // procedures, it is not needed for this one.
  // Instead of setting up a database connection, we can pass
  // an empty object as the context and cast it as "any".
  // This will not cause any issues as long as we do not try
  // to access the database in the procedure.
  // https://trpc.io/docs/server/server-side-calls#create-caller
  const { greet } = createCaller({} as any)

  // input = 'Sofia'
  const greeting = await greet('Sofia')

  expect(greeting).toEqual('Hello, Sofia')
})
