import pgvector from 'pgvector/pg'
import pg from 'pg'
import documentsPlain from './documentsPlainAll.json' assert { type: 'json' }

/**
 * @typedef {Object} DocumentsEmbeddingsModel
 * @property {Function} getDocumentEmbedding
 */

/**
 * @typedef {Object} DatabaseConfig
 * @property {string} user
 * @property {string} password
 * @property {string} database
 * @property {string} host
 * @property {string} port
 * @param {DatabaseConfig} connectionConfig
 * @returns {Promise<pg.Pool>}
 */
export async function connect(connectionConfig) {
  const { Pool } = pg

  const missing = Object
    .entries(connectionConfig)
    .find(([_, value]) => !value)

  if (missing) {
    throw new Error('Missing environment variable: %s', missing[0])
  }

  const pool = new Pool(connectionConfig)

  new Pool(connectionConfig).on('connect', async (client) => {
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector')
    await pgvector.registerType(client)
  })

  return pool.connect()
}

/**
 * Creates the documents table and seeds it with the documents.
 * @param {pg.Pool} database
 * @param {DocumentsEmbeddingsModel} embeddingsModel
 */
export async function migrate(database, embeddingsModel) {
  await createDocumentsTable(database)
  await seedDocuments(database, embeddingsModel)
}

/**
 * @param {pg.Pool} database
 */
async function createDocumentsTable(database) {
  const VECTOR_DIMENSIONS = 1024

  await database.query(`
    CREATE TABLE IF NOT EXISTS documents (
      id bigserial PRIMARY KEY,
      topic text,
      content text,
      embedding vector(${VECTOR_DIMENSIONS})
    )`
  )
}

/**
 * @param {pg.Pool} database
 * @param {DocumentsEmbeddingsModel} embeddingsModel
 */
async function seedDocuments(database, embeddingsModel) {
  // if there are already documents, don't seed
  const countQuery = await database.query('SELECT COUNT(*) FROM documents')
  const count = Number(countQuery.rows[0].count)

  if (count > 0) return

  const documentsWithEmbeddings = await documentsPlain

    // for a list of tasks
    .map(({ topic, content }) => async () => {
      const embedding = await embeddingsModel.getDocumentEmbedding(content)

      return {
        topic,
        content,
        embedding,
      }
    })

    // execute the tasks one by one to minimize rate limiting issues
    .reduce(async (previous, task) => [
      ...(await previous),
      await task(),
    ], Promise.resolve([]))

  // While we shouldn't expect to get a SQL injection from our own
  // JSON file, it's still a good practice to use parameterized queries
  // just in case we decide to copy-paste this code somewhere else.
  const queryParams = documentsWithEmbeddings
    .map((_, index) => {
      const argIndex = index * 3 + 1

      return `($${argIndex}, $${argIndex + 1}, $${argIndex + 2})`
    })
    .join(', ')

  // flatMap because we need:
  // - not [[topic, content, emb], [topic, content, emb], ...]
  // - but [topic, content, emb, topic, content, emb, ...]
  const queryValues = documentsWithEmbeddings
    .flatMap(({ topic, content, embedding }) => [topic, content, pgvector.toSql(embedding)])

  await database.query(`
    INSERT INTO documents (topic, content, embedding)
    VALUES ${queryParams}
  `, queryValues)
}
