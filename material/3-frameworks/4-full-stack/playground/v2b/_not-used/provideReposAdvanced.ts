import type {
  Repositories,
  RepositoriesFactories,
  RepositoriesKeys,
} from '@server/repositories'
import { middleware } from '..'

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

/**
 * Middleware that provides repositories for the specified entities in the context.
 * @param reposWanted An object containing the entities for which repositories are wanted.
 * @returns A middleware function that provides the repositories in the context.
 */
export default function provideRepos<TKeys extends RepositoriesKeys>(
  reposWanted: Pick<RepositoriesFactories, TKeys>
) {
  return middleware(({ ctx, next }) => {
    // Check if all repositories are already provided in the context
    const keys = Object.keys(reposWanted) as TKeys[]

    const reposExisting = ctx.repos || {}

    // Early return if all repositories are already provided
    if (hasAllRepositories(ctx, keys)) {
      return next({
        ctx: {
          repos: ctx.repos,
        },
      })
    }

    const reposWantedTuples = Object.entries(reposWanted) as Entries<
      Pick<RepositoriesFactories, TKeys>
    >

    // Definitely not optimized for performance, but it's fine for demonstration purposes
    const repos = Object.fromEntries(
      reposWantedTuples.map(([key, repoFactory]) => [
        key,
        key in reposExisting ? reposExisting[key] : repoFactory(ctx.db),
      ])
    ) as Pick<Repositories, TKeys>

    return next({
      ctx: {
        repos,
      },
    })
  })
}

/**
 * Checks if the given context object has all the repositories specified by the keys array.
 * @param ctx - The context object to check.
 * @param keys - An array of keys representing the repositories to check for.
 * @returns A boolean indicating whether the context object has all the specified repositories.
 */
function hasAllRepositories<TKeys extends keyof Repositories>(
  ctx: any,
  keys: TKeys[]
): ctx is { repos: Pick<Repositories, TKeys> } {
  return keys.every((key) => ctx.repos && key in ctx.repos)
}
