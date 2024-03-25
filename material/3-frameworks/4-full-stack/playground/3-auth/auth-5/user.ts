import { initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import z from 'zod'

const { procedure, router } = initTRPC.create()

// Optional pepper. This would be an environment variable.
// If we enforce strong passwords, this would not be needed.
const PASSWORD_PEPPER = '3#rqqZQvTPscm&gW'

export const userRouter = router({
  signup: procedure
    .input(z.object({
      email: z.string(),
      password: z.string().min(8),
    }))
    .mutation(async ({ input: user }) => {
      user.password = await bcrypt.hash(`${user.password}${PASSWORD_PEPPER}`, 10)

      userRepository.create(user)
    })
})

export const userRepository: UserRepository = {
  list: [],
  create(user) {
    this.list.push(user)
  },
  find(email) {
    return this.list.find((user) => user.email === email)
  },
}

type User = {
  email: string
  password: string
}

type UserRepository = {
  list: User[]
  create(user: User): void
  find(email: string): User | undefined
}
