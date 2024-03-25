import 'dotenv/config'
import { CohereClient } from 'cohere-ai'
import pgvector from 'pgvector/pg'
import pg from 'pg'

const { Pool } = pg

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

await pool.query(`
  CREATE TABLE IF NOT EXISTS notes (
    id bigserial PRIMARY KEY,
    content text,
    embedding vector(1024)
  )`
)

await pool.query(`DELETE FROM notes`)

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

const [embeddingA, embeddingB] = response.embeddings

await pool.query(
  'INSERT INTO notes (content, embedding) VALUES ($1, $2), ($3, $4)',
  [contentA, pgvector.toSql(embeddingA), contentB, pgvector.toSql(embeddingB)]
)

const queryA = 'Chickens'
const queryB = 'Vector databases'

const responseForQuery = await cohere.embed({
  texts: [queryA, queryB],
  model: 'embed-english-v3.0',
  inputType: 'search_query',
})

const [queryEmbeddingA, queryEmbeddingB] = responseForQuery.embeddings

const closestToA = await pool.query(
  `SELECT content, embedding <=> $1 AS distance
   FROM notes
   ORDER BY distance ASC
   LIMIT 10`,
  [pgvector.toSql(queryEmbeddingA)]
)

const closestToB = await pool.query(
  `SELECT content, embedding <=> $1 AS distance
   FROM notes
   ORDER BY distance ASC
   LIMIT 10`,
  [pgvector.toSql(queryEmbeddingB)]
)

console.log('Closest to query A:', closestToA.rows)
console.log('Closest to query B:', closestToB.rows)

await pool.end()
