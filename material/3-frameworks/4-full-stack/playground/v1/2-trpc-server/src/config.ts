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
      type: z
        .enum(['postgres', 'mysql', 'mariadb', 'better-sqlite3'])
        .default('postgres'),
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: z.string(),
      username: z.string(),
      password: z.string(),

      // By default, log and synchronize the database schema only for tests and development.
      logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
      synchronize: z.preprocess(coerceBoolean, z.boolean().default(true)),
    }),

    // auth (soon)
    auth: z.object({
      tokenKey: z.string(),
      expiresIn: z.string().default('7d'),
    }),
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,

  database: {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.DB_LOGGING,
    synchronize: env.DB_SYNC,
  },

  auth: {
    tokenKey: env.TOKEN_KEY,
    expiresIn: env.TOKEN_EXPIRES_IN,
  },
})

export default config

// utility functions
function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1'
  }

  return undefined
}
