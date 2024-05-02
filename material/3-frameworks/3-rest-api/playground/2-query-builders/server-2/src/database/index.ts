// reading environment variables from .env file
import 'dotenv/config'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import type { DB } from './types' // we handle this in the next step

export * from './types' // we handle this in the next step

// we are pulling DATABASE_URL from our environment variables
const { DATABASE_URL } = process.env

if (!DATABASE_URL) {
  throw new Error('Provide DATABASE_URL in your environment variables.')
}

// creating the SQLite database instance
const database = new Database(DATABASE_URL)

// wrapping inside a shared interface which allows Kyseley
// to understand it. This would allow us to use a different
// database engine in the future.
const dialect = new SqliteDialect({ database })

// finally, we are creating a Kysely instance which we will
// use to interact with the our database
export default new Kysely<DB>({
  dialect,

  // Bonus! Automatically convert snake_case to camelCase
  // and vice versa, so we are using the JS camelCase convention
  // in our JS files and the SQL snake_case convention in our database.
  // This is one of the many advantages of using an abstraction
  // over raw SQL - we can easily perform wide-spread changes.
  plugins: [new CamelCasePlugin()],
})
