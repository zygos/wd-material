import userRouter from '..'

it('should greet a user by provided name', async () => {
  // ctx = {}. We cast it as "any" as we have defined our context
  // to include a database. However, here we do not need it.
  // https://trpc.io/docs/server/server-side-calls#create-caller
  const { greet } = userRouter.createCaller({} as any)

  // input = 'Sofia'
  const greeting = await greet('Sofia')

  expect(greeting).toEqual('Hello, Sofia')
})
