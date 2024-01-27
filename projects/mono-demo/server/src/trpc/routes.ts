import moviesRouter from '@server/modules/movies/router'
import { mergeRouters } from '.'

export const appRouter = mergeRouters(
  moviesRouter,
)

export type AppRouter = typeof appRouter
