import { router } from '@server/trpc'
import login from './login'
import signup from './signup'

export default router({
  login,
  signup,
})
