import 'dotenv/config'
import pg from 'pg'
import { isNil, omitBy } from 'lodash/fp'
import createTables from './createTables'
import { type Database, type Table } from '.'

export const createDatabase = (options: pg.PoolConfig): Database => {
  const pool = new pg.Pool(options)

  return {
    parametersType: 'dollarSign',

    async queryAll(sql, bindings) {
      const client = await pool.connect()

      try {
        await client.query('BEGIN')
        const result = await client.query(sql, bindings)
        await client.query('COMMIT')
        return result.rows || result.fields
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    },
    async run(sql, bindings) {
      const client = await pool.connect()

      try {
        await client.query('BEGIN')
        const result = await client.query(sql, bindings)
        await client.query('COMMIT')
        return result
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    },
    async release() {
      await pool.end()
    },
    async getTables() {
      const client = await pool.connect()

      try {
        const result = await client.query(
          `SELECT table_name AS name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`,
        )

        return (result.rows || result.fields) as Table[]
      } finally {
        client.release()
      }
    },
  }
}

export const createDatabaseWithTables = async (options: pg.PoolConfig) => {
  const database = createDatabase(options)
  return createTables(database)
}

export const formOptions = (options: pg.PoolConfig, env: NodeJS.ProcessEnv) =>
  omitBy(isNil, {
    user: options.user || env.POSTGRES_USER,
    host: options.host || env.POSTGRES_HOST || 'localhost',
    database: options.database || env.POSTGRES_NAME,
    password: options.password || env.POSTGRES_PASS,
    port: options.port || env.POSTGRES_PORT || 5432,
  })
