import { initTRPC } from '@trpc/server'
import { pbkdf2Sync } from 'node:crypto'
import z from 'zod'

const { procedure, router } = initTRPC.create()

// this would be in an environment variable
const SECRET_SALT = '3#rqqZQvTPscm&gW'

export const userRouter = router({
  signup: procedure
    .input(z.object({
      email: z.string(),
      password: z.string().min(8),
    }))
    .mutation(({ input: user }) => {
      user.password = pbkdf2Sync(user.password, SECRET_SALT, 1000, 32, 'sha512').toString('hex')

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
