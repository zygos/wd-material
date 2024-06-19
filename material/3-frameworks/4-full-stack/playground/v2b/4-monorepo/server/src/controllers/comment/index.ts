import { router } from '@server/trpc'
import find from './find'
import markAsSpam from './markAsSpam'
import post from './post'

export default router({
  find,
  markAsSpam,
  post,
})
