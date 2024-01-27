import { router } from '@server/trpc'
import getMovies from './getMovies'
import getMovieFull from './getMovieFull'

export default router({
  getMovies,
  getMovieFull,
})
