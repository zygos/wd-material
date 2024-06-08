import type { Database } from '@server/database'
import { bugRepository } from './bugRepository'
import { projectRepository } from './projectRepository'
import { userRepository } from './userRepository'

export type RepositoryFactory = <T>(db: Database) => T

// index of all repositories for provideRepos
const respositories = { bugRepository, projectRepository, userRepository }

export type RepositoriesFactories = typeof respositories
export type Repositories = {
  [K in keyof RepositoriesFactories]: ReturnType<RepositoriesFactories[K]>
}
export type RepositoriesKeys = keyof Repositories

export { respositories }
