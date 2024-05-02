import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import userRouter from '..'

// Here we are testing our endpoint as a whole. This would be closer
// to an integration test than to a unit test.
// However, there is no easy way to separate the endpoint from the
// repository without introducing an ORM-independent service layer.
// Then, instead of passing in the entire database (TypeORM DataSource)
// to the procedure, we would pass in a collection of services, which
// sit on top of an ORM repositories. Then, each procedure would only
// specify what services it needs, and the caller would provide them.
// For example: signup({ input, ctx: { services: { user } } }).

// This would be a more testable approach as we could:
// - not expose our router tests to TypeORM implementation details through
//   leaky mocks that break if we change how we interact with TypeORM
// - provide fake services to the procedure, which would be easier to
//   setup per test case and would not require a instantiated database

// For our small projects, it is fine not to have all these layers
// of abstraction. Even passing in the entire database to the procedure
// is already an improvement over importing the repository directly.

const createCaller = createCallerFactory(userRouter)

it('should save a user', async () => {
  // ARRANGE (Given)
  // A temporary empty test database just for this test.
  // We could put this database outside the test case to share it between test.
  // However, it is generally easier to reason about tests if they are isolated
  // and can be run in any order without any worries about some data being left
  // over from previous tests.
  const db = await createTestDatabase()

  // We provide db to the caller, which will be available in the
  // procedure as ctx.db. This is dependency injection in action.
  const { signup } = createCaller({ db })

  // ACT (When)
  const response = await signup({
    email: 'user@domain.com',
    password: 'password.123',
  })

  // ASSERT (Then)
  expect(response).toEqual({
    id: expect.any(Number),
    email: 'user@domain.com',
    // do not return the password back to the user
  })

  // checking that we have saved the user, not just returned it
  const userCreated = await db.getRepository(User).findOneByOrFail({
    email: 'user@domain.com',
  })

  expect(userCreated).toEqual({
    id: expect.any(Number),
    email: 'user@domain.com',

    // we will learn how to handle passwords in a more secure way later
    password: 'password.123',
  })

  // TypeScript will not complain about this line once
  // you add an implementation to the signup procedure.
  expect(response.id).toEqual(userCreated!.id)
})
