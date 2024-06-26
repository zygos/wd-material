import { createCallerFactory } from '@server/trpc'
import userRouter from '..'

// We will create test calls for our userRouter.
const createCaller = createCallerFactory(userRouter)

it('should greet a user by provided name', async () => {
  // tRPC demands a context object (ctx) to be passed to the caller.
  // The context object must match the TypeScript type provided
  // in the trpc/index.ts file. This type includes a database.
  // While that is a reasonable requirement for most of the
  // procedures, it is not needed for this one.
  // Because we do not need a database connection to send
  // a greeting message, we will just pass an empty object
  // as the context.
  // We will need to cast it as "any" in this test.
  // This will not cause any issues as long as we do not try
  // to access the database in the procedure.
  // If we would need to access the database, we would need
  // to pass in the `db` inside the context object. This
  // could be a real database connection or something that
  // mimicks it in the tests.
  // https://trpc.io/docs/server/server-side-calls#create-caller
  const { greet } = createCaller({} as any)

  // input = 'Sofia'
  const greeting = await greet('Sofia')

  expect(greeting).toEqual('Hello, Sofia')
})
