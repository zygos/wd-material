import { router } from '../trpc'
import bug from './bug'
import project from './project'
import user from './user'

export const appRouter = router({
  bug,
  project,
  user,
})

export type AppRouter = typeof appRouter
