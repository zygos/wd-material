import { router } from '../trpc'
import article from './article'
import comment from './comment'
import user from './user'

export const appRouter = router({
  article,
  comment,
  user,
})

export type AppRouter = typeof appRouter
