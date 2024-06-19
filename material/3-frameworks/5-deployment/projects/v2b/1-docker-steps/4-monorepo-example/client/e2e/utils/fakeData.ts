import type { Article, Comment, User } from '@server/shared/types'
import type { Insertable } from 'kysely'
import { Chance } from 'chance'

// Chance is a lightweight fake data generator.
// Faker.js is another popular library, but it is relatively slow to import.
// Also, if we are running tests in CI server, we want to use the same seed
// every time to make the tests deterministic.
export const random = process.env.CI ? Chance(1) : Chance()

/**
 * Creates a new user with a random email and password. We want a random email
 * as our E2E tests can run against a real database, and we don't want to
 * our tests to fail because of a duplicate email.
 */
export const fakeUser = <T extends Insertable<User>>(overrides: Partial<T> = {} as T) => ({
  email: random.email(),
  password: 'password.123',
  firstName: random.first(),
  lastName: random.last(),
  ...overrides,
})

export const fakeArticle = <T extends Partial<Insertable<Article>>>(overrides: T = {} as T) => ({
  title: random.sentence({ words: 5 }),
  content: random.paragraph(),
  ...overrides,
})

export const fakeComment = <T extends Partial<Insertable<Comment>>>(overrides: T = {} as T) => ({
  content: random.sentence({ words: 10 }),
  ...overrides,
})
