import 'dotenv/config'
import { z } from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'

const isTest = env.NODE_ENV === 'test'
const isDevTest = env.NODE_ENV === 'development' || isTest

const schema = z
  .object({
    env: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    isCi: z.preprocess(coerceBoolean, z.boolean().default(false)),
    port: z.coerce.number().default(3000),

    // we can pass in either a real database config or a in-memory database config
    database: z.discriminatedUnion('type', [
      // real database config
      z.object({
        type: z.enum(['postgres', 'mysql']).default('postgres'),

        host: z.string().default('localhost'),
        port: z.coerce.number().default(5432),
        database: z.string(),
        username: z.string(),
        password: z.string(),

        // By default, log and synchronize the database schema only for tests and development.
        ssl: z.preprocess(coerceBoolean, z.boolean().default(!isDevTest)),
        logging: z.preprocess(coerceBoolean, z.boolean().default(isDevTest)),
        synchronize: z.preprocess(
          coerceBoolean,
          z.boolean().default(true)
        ),
      }),

      // in-memory database config
      z.object({
        type: z.literal('pg-mem'),
      }),
    ]),
  })
  .readonly()

const config = schema.parse({
  env: env.NODE_ENV,
  port: env.PORT,
  isCi: env.CI,

  database: {
    type: env.DB_TYPE || 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: env.DB_LOGGING,
    synchronize: env.DB_SYNC,
    ssl: env.DB_SSL,
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
