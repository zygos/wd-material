import type { Bug, Project, User } from '@server/database/types'
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
 * Generates a fake project with some default test data.
 * @param overrides userId and any properties that should be different from default fake data.
 */
export const fakeProject = <T extends Partial<Insertable<Project>>>(
  overrides: T
): Insertable<Project> => ({
  name: random.string(),
  userId: randomId(),
  ...overrides,
})

/**
 * Generates a fake bug with some default test data.
 * @param overrides projectId and any properties that should be different from default fake data.
 */
export const fakeBug = <T extends Partial<Insertable<Bug>>>(
  overrides: T
): Insertable<Bug> & { resolvedAt: null } => ({
  name: 'OurFakeError',
  code: '500',
  stacktrace: 'Error: OurFakeError\n    at <anonymous>:1:1',
  projectId: randomId(),
  ...overrides,
  resolvedAt: null,
})
