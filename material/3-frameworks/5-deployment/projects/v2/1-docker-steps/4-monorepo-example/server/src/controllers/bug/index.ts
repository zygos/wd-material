import { router } from '@server/trpc'
import find from './find'
import report from './report'
import resolve from './resolve'

export default router({
  find,
  report,
  resolve,
})
