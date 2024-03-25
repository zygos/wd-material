import { router } from '@server/trpc'
import greet from './greet'
import signup from './signup'

export default router({
  // user.greet
  greet,

  // user.signup
  signup,
})
