import { router } from '@server/trpc'
import findAll from './findAll'
import get from './get'

export default router({
  findAll,
  get,
})
