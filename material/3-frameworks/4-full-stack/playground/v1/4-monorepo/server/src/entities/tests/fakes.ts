import type { User } from '@server/entities/user'
import type { Project } from '@server/entities/project'
import type { Bug } from '@server/entities/bug'
import { random } from '@tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
})

/**
 * Generates a fake project with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeProject = <T extends Partial<Project>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  name: random.string(),
  ...overrides,
})

/**
 * Generates a fake bug with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeBug = <T extends Partial<Bug>>(overrides: T = {} as T) => ({
  id: randomId(),
  name: 'OurFakeError',
  code: '500',
  stacktrace: 'Error: OurFakeError\n    at <anonymous>:1:1',
  resolvedAt: null,
  ...overrides,
})
