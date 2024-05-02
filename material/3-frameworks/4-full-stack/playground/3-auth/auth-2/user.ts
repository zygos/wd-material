import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const { procedure, router, createCallerFactory } = initTRPC.create()

export { createCallerFactory }

export const userRouter = router({
  signup: procedure
    .input(z.object({
      email: z.string(),
      password: z.string().min(8),
    }))
    .mutation(({ input: user }) => {
      userRepository.create(user)
    })
})

// We would generally like to provide it as a dependency,
// through the context, but for simplicity we will use a shared
// variable.
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
