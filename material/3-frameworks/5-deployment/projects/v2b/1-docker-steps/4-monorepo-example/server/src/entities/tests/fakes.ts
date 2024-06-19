import type { Article, Comment, User } from '@server/database/types'
import type { Insertable } from 'kysely'
import { random } from '@tests/utils/random'
import type { AuthUser } from '../user'

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

export const fakeAuthUser = <T extends Partial<AuthUser>>(
  overrides: T = {} as T
): AuthUser => ({
  id: randomId(),
  email: random.email(),
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

/**
 * Generates a fake comment with some default test data.
 * @param overrides articleId and any properties that should be different from default fake data.
 */
export const fakeComment = <T extends Partial<Insertable<Comment>>>(
  overrides: T
): Insertable<Comment> & { createdAt: Date } => ({
  content: random.paragraph({ sentences: 2 }),
  articleId: randomId(),
  userId: randomId(),
  isSpam: false,
  ...overrides,
  createdAt: new Date(),
})
