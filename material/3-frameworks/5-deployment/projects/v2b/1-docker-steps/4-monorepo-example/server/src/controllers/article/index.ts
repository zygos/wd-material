import { router } from '@server/trpc'
import create from './create'
import findAll from './findAll'
import get from './get'

export default router({
  create,
  findAll,
  get,
})
