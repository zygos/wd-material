import pgvector from 'pgvector/pg'

/**
 * @typedef {Object} QueryEmbeddingsModel
 * @property {Function} getQueryEmbedding
 */

/**
 * @typedef {Object} Document
 * @property {string} topic
 * @property {string} content
 */

/**
 * Returns the relevant documents for the given question.
 * @param {pg.Pool} database
 * @param {QueryEmbeddingsModel} embeddingsModel
 * @param {string} question
 * @returns {Promise<Document & { distance: number }[]>}
 */
export async function getRelevantDocuments(database, embeddingsModel, question) {
  const questionEmbedding = await embeddingsModel.getQueryEmbedding(question)

  const results = await database.query(
    `SELECT topic, content, embedding <=> $1 AS distance
     FROM documents
     WHERE distance < 0.6
     ORDER BY distance ASC
     LIMIT 5`,
    [pgvector.toSql(questionEmbedding)]
  )

  return results.rows
}
