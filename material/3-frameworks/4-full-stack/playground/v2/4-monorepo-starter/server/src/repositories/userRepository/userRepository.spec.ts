import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import { userRepository } from '.'

const db = await wrapInRollbacks(createTestDatabase())
const repository = userRepository(db)

// This is an example of testing a repository. However, given realistic
// time constraints in your projects, you can skip some tests that are
// a result of copy-pasting the same functionality over repositories
// over and over again. However, if it is your first time writing a
// particular behaviour (joins, nested queries, transactions, etc.),
// then it is a good idea to start with a test to make sure you
// understand the behaviour correctly.

describe('create', () => {
  it('should create a new user and return the created user', async () => {
    // Arrange
    const user = {
      email: 'john@example.com',
      password: 'password',
    }

    // Act
    const userCreated = await repository.create(user)

    // Assert
    expect(userCreated).toEqual({
      id: expect.any(Number),
      email: user.email,
      password: user.password,
    })
  })
})

describe('findByEmail', () => {
  it('should return the user with the specified email', async () => {
    // Arrange
    const email = 'john@example.com'
    const user = { email, password: 'password' }
    await repository.create(user)

    // Act
    const userFound = await repository.findByEmail(email)

    // Assert
    expect(userFound).toEqual({
      id: expect.any(Number),
      email: user.email,
      password: user.password,
    })
  })

  it('should return undefined if no user is found with the specified email', async () => {
    // Arrange
    const email = 'nonexistent@example.com'

    // Act
    const userFound = await repository.findByEmail(email)

    // Assert
    expect(userFound).toBeUndefined()
  })
})
