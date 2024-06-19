import type { Article, User } from '@server/database/types'
import type { Insertable } from 'kysely'
import { random } from '@tests/utils/random'

const randomId = () =>
  random.integer({
    min: 1,
    max: 1000000,
  })

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<Insertable<User>>>(
  overrides: T = {} as T
): Insertable<User> => ({
  email: random.email(),
  firstName: random.first(),
  lastName: random.last(),
  password: 'Password.123!',
  ...overrides,
})

/**
 * Generates a fake article with some default test data.
 * @param overrides userId and any properties that should be different from default fake data.
 */
export const fakeArticle = <T extends Partial<Insertable<Article>>>(
  overrides: T
): Insertable<Article> => ({
  title: random.string(),
  content: random.paragraph(),
  userId: randomId(),
  ...overrides,
})
