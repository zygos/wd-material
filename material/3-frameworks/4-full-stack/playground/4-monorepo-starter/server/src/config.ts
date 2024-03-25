import 'dotenv/config'
import z from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'

const isTest = env.NODE_ENV === 'test'
const isDevTest = env.NODE_ENV === 'development' || isTest

const isInMemory = env.DB_TYPE === 'pg-mem'

const schema = z
  .object({
    env: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    isCi: z.boolean().default(false),
    port: z.coerce.number().default(3000),

    auth: z.object({
      tokenKey: z.string().default(() => {
        if (isDevTest) {
          return ''
        }

        throw new Error('You must provide a token key in production env!')
      }),
      expiresIn: z.string().default('7d'),
      passwordCost: z.coerce.number().default(isDevTest ? 6 : 12),
    }),

    database: z.object({
      type: z
        .enum(['postgres', 'mysql', 'mariadb', 'better-sqlite3', 'pg-mem'])
        .default('postgres'),
      host: z.string().default('localhost'),
      port: z.coerce.number().default(5432),
      database: isInMemory ? z.string().optional() : z.string(),
      username: isInMemory ? z.string().optional() : z.string(),
      password: isInMemory ? z.string().optional() : z.string(),

      // By default, log and synchronize the database schema only for tests and development.
      logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
      synchronize: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
    }),
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  isCi: env.CI,

  auth: {
    tokenKey: env.TOKEN_KEY,
    expiresIn: env.TOKEN_EXPIRES_IN,
    passwordCost: env.PASSWORD_COST,
  },

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
})

export default config

// utility functions
function coerceBoolean(value: unknown) {
  if (typeof value === 'string') {
    return value === 'true' || value === '1'
  }

  return undefined
}
