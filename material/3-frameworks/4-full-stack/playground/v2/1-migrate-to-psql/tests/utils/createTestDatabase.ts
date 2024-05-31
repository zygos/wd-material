import config from '@/config'
import { createDatabase } from '@/database'

/**
 * Creates a test database instance. In this case, it is the same as the
 * main database instance.
 */
export const createTestDatabase = () => createDatabase(config.database)
