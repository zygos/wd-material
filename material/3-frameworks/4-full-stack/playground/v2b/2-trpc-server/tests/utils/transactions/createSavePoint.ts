import { type Kysely, type Transaction, sql } from 'kysely'

export default function createSavePoint(db: Kysely<any> | Transaction<any>) {
  const name = `sp_${process.hrtime.bigint()}`

  return {
    save: async () => {
      await sql`savepoint ${sql.raw(name)}`.execute(db)
    },
    release: async () => {
      await sql`release savepoint ${sql.raw(name)}`.execute(db)
    },
    rollback: async () => {
      await sql`rollback to savepoint ${sql.raw(name)}`.execute(db)
    },
  }
}
