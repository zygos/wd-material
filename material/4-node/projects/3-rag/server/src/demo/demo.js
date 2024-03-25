import 'dotenv/config'
import { CohereClient } from 'cohere-ai'
import pgvector from 'pgvector/pg'
import { Pool } from 'pg'

const connectionConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

const pool = new Pool(connectionConfig)

pool.on('connect', async (client) => {
  await pool.query('CREATE EXTENSION IF NOT EXISTS vector')
  await pgvector.registerType(client)
})

await pool.connect()

await client.query(`
  CREATE TABLE notes IF NOT EXISTS (
    id bigserial PRIMARY KEY,
    content text,
    embedding vector(1024)
  )`
)

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

const contentA = 'How to cook a turkey'
const contentB = 'Storing embeddings'

const response = await cohere.embed({
  texts: [contentA, contentB],
  model: 'embed-english-v3.0',
  inputType: 'search_document',
})

const embeddingA = response.embeddings[0]
const embeddingB = response.embeddings[1]

await pool.query(
  'INSERT INTO notes (content, embedding) VALUES ($1, $2), ($3, $4)',
  [noteA.content, embeddingA, noteB.content, embeddingB]
)

const queryA = 'Chickens'
const queryB = 'Vector databases'

const responseForQuery = await cohere.embed({
  texts: [queryA, queryB],
  model,
  inputType: 'search_query',
})

const queryEmbeddingA = responseForQuery.embeddings[0]
const queryEmbeddingB = responseForQuery.embeddings[1]

const results = await pool.query(
  `SELECT content, embedding <-> $1 AS distance
   FROM notes
   ORDER BY distance ASC
   LIMIT 10`,
  [queryEmbeddingA]
)

//   // assert(isNumberEmbeddingsArray(response.embeddings))

//   return response.embeddings[0]
// }

// function isNumberEmbeddingsArray(value: unknown): value is number[][] {
//   return Array.isArray(value) && typeof value[0][0] === 'number'
// }
