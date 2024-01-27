import { router } from '../trpc'
import dog from './dog'

export const appRouter = router({
  dog,
})

export type AppRouter = typeof appRouter
