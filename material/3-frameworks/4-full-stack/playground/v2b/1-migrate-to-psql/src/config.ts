import 'dotenv/config'
import { z } from 'zod'

const { env } = process

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
      connectionString: z.string().default(':memory:'),
    }),
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  database: {
    connectionString: env.DATABASE_URL,
  },
})

export default config
