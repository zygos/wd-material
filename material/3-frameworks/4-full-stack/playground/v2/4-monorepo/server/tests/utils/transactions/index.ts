import { Kysely, Transaction } from 'kysely'
import beginTransaction from './beginTransaction'
import createSavePoint from './createSavePoint'

// NOTE: This module has been added to the template to allow using rollbacked
// tests without the need to restructure the tests or think about transactions
// while handling some tricky nested transaction logic.
// It contains various JS/TS concepts that even intermediate developers would
// not be familiar with. You can treat it as a black box and just use the
// wrapInRollbacks function in your tests.

const symbolOriginal = Symbol('original')
const symbolSetInstance = Symbol('setInstance')
const symbolOverride = Symbol('override')

type DatabaseProxy<T, N extends T = any> = T & {
  [symbolOriginal]: T
  [symbolSetInstance]: (replacement: N) => void
  [symbolOverride]: (name: keyof T, value: any) => void
}

/**
 * Sets up Vitest hooks for a Kysely database instance to
 * use a transaction for the test suite and individual savepoints
 * for each test.
 * Original transaction behavior is overridden to use savepoints.
 * This must be run before any database queries that you want to be
 * rollbacked after the test suite.
 */
export async function wrapInRollbacks<T = any, K extends Kysely<T> = any>(
  db: K
): Promise<K> {
  const dbProxy = wrapInProxy(db)
  const transaction = await beginTransaction(dbProxy[symbolOriginal])

  // Swap out the database instance with the transaction instance.
  dbProxy[symbolSetInstance](transaction.trx)

  beforeEach(async () => {
    const preTestState = createSavePoint(dbProxy)

    await preTestState.save()

    // Override the transaction method to use savepoints for nested transactions.
    // This allows using transactions inside our application code without
    // worrying about the test suite's transaction.
    dbProxy[symbolOverride]('transaction', () => ({
      isTransaction: () => true,
      execute: async <N>(fn: (trx: Transaction<T>) => N) => {
        const innerState = createSavePoint(dbProxy)
        await innerState.save()

        try {
          const result = await fn(dbProxy as any)
          await innerState.release()
          return result
        } catch (error) {
          await innerState.rollback()
          throw error
        }
      },
    }))

    // Vitest uses the returned function in the afterEach hook
    return preTestState.rollback
  })

  afterAll(transaction.rollback)

  return dbProxy
}

/**
 * Creates a proxy for a database instance which allows hot-swapping
 * the database instance with a transaction instance at runtime.
 * This allows the same database instance to be used for multiple tests
 * without having to create a new instance for each test.
 */
function wrapInProxy<T extends object, N extends T>(
  dbBase: T
): DatabaseProxy<T> {
  let instance = dbBase
  const overrides = new Map()

  return new Proxy(instance, {
    get(_, prop) {
      if (prop === symbolOriginal) {
        return dbBase
      }

      if (prop === symbolSetInstance) {
        return (instanceNew: N) => {
          instance = instanceNew
        }
      }

      if (prop === symbolOverride) {
        return overrides.set.bind(overrides)
      }

      if (overrides.has(prop)) {
        return overrides.get(prop)
      }

      const value = instance[prop as keyof typeof instance]

      return typeof value === 'function' ? value.bind(instance) : value
    },
  }) as DatabaseProxy<T>
}
