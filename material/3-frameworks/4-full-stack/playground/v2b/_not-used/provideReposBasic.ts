import {
  repositories,
  type Repositories,
  type RepositoriesKeys,
  type RepositoryFactory,
} from '@server/repositories'
import { mapValues, memoize } from 'lodash-es'
import { middleware } from '..'

// Performance optimization to call repository factories only once.
const repositoriesMemo = mapValues(repositories, (repoFactory) =>
  memoize(repoFactory)
)

const none: Partial<Repositories> = {}

/**
 * Middleware that provides repositories in the context.
 */
export const provideRepos = middleware(({ ctx, next }) => {
  const reposProvided = ctx.repos || none

  // necessary to cast to Repositories because of the way lodash typings are set up
  const repos = mapValues(
    repositoriesMemo,
    (repoFactory: RepositoryFactory, key: RepositoriesKeys) =>
      reposProvided[key] || repoFactory(ctx.db)
  ) as unknown as Repositories

  return next({
    ctx: {
      repos,
    },
  })
})
