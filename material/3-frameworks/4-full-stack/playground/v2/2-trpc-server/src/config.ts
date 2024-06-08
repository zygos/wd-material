import 'dotenv/config'
import { z } from 'zod'

const { env } = process
const isDevTest = env.NODE_ENV === 'development' || env.NODE_ENV === 'test'

const schema = z
  .object({
    // environment
    env: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),

    // server
    port: z.coerce.number().default(3000),

    // database
    database: z.object({
      connectionString: z.string().url(),
    }),

    // auth (soon)
    auth: z.object({
      tokenKey: z.string().default(() => {
        if (isDevTest) {
          return 'supersecretkey'
        }

        throw new Error('You must provide a token key in production env!')
      }),
      expiresIn: z.string().default('7d'),
    }),
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,

  database: {
    connectionString: env.DATABASE_URL,
  },

  auth: {
    tokenKey: env.TOKEN_KEY,
    expiresIn: env.TOKEN_EXPIRES_IN,
  },
})

export default config
