import { router } from '../trpc'
import user from './user'

export const appRouter = router({
  // all user.* procedures
  user,
})

export type AppRouter = typeof appRouter
