import type { Kysely, Transaction } from 'kysely'

/**
 * Begins a transaction on the specified database connection.
 * @returns An object containing the transaction and a rollback function.
 */
export default async function beginTransaction<T>(db: Kysely<T>) {
  const connection = createDeferred<Transaction<T>>()
  const result = createDeferred<any>()

  db.transaction()
    .execute((trx) => {
      connection.resolve(trx)
      return result.promise
    })
    .catch((error) => {
      // throw errors for failed database connections
      if (error.code === 'ECONNREFUSED') {
        connection.reject(new Error('Could not connect to the database.'))
      }

      // Don't do anything here. Just swallow the exception as
      // this is an expected rollback error.
    })

  const trx = await connection.promise

  return {
    trx,
    rollback() {
      result.reject(new Error('rollback'))
    },
  }
}

/**
 * Creates a deferred object that represents a pending promise.
 * The deferred object contains a promise that can be resolved or rejected later.
 * @returns An object with a promise, resolve, and reject properties.
 * The promise represents the pending operation, while the resolve and reject functions
 * can be used to fulfill or reject the promise.
 * @typeparam T The type of the value that the promise will resolve to.
 */
function createDeferred<T>() {
  let resolve: (value: T | PromiseLike<T>) => void
  let reject: (reason?: any) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve: resolve!, reject: reject! }
}
