import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { selectAll } from '@tests/utils/records'
import userRouter from '..'

// automatically rollback any changes made to the database in tests
const db = await wrapInRollbacks(createTestDatabase())

// We provide db to the caller, which will be available in the
// procedure. This is dependency injection in action.
const { signup } = createCallerFactory(userRouter)({ db })

it('should save a user', async () => {
  // ARRANGE (Given)
  const user = {
    email: 'user@domain.com',
    password: 'password.123',
    firstName: 'Jane',
    lastName: 'Doe',
  }

  // ACT (When)
  const response = await signup(user)

  // ASSERT (Then)
  // expect the database to have saved the user
  const [userCreated] = await selectAll(db, 'user', (eb) =>
    eb('email', '=', user.email)
  )

  expect(userCreated).toMatchObject({
    id: expect.any(Number),
    email: 'user@domain.com',
    password: 'password.123',
    firstName: 'Jane',
    lastName: 'Doe',
  })

  expect(response).toEqual({
    // same id as the one in the database
    id: userCreated.id,
  })
})
