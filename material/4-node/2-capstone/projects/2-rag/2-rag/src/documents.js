import documents from './documentsEmbeddings.json' assert { type: 'json' }
import questionsEmbeddings from './questionsEmbeddings.json' assert { type: 'json' }

/**
 * Returns the relevant documents for the given question.
 * @param {string} question
 * @returns {string[]} The relevant documents.
 */
export function getRelevantDocuments(question) {
  const questionEmbedding = getEmbedding(question)

  if (!questionEmbedding) return []

  const documentsRelevant = documents
    // map from a document to a document with a similarity score
    .map(doc => ({
      ...doc,
      similarity: dotProductSimilarity(questionEmbedding, doc.embedding),
    }))

    // sort by descending similarity
    .sort((a, b) => b.similarity - a.similarity)

    // return the top 3 - you could also use a threshold similarity score or take
    // documents up until a drop in similarity between neighboring documents
    .slice(0, 3)

  return documentsRelevant
}

/**
 * Returns a mocked embedding for the given question.
 * @param {string} question
 */
function getEmbedding(question) {
  const questionLower = question.toLowerCase()

  if (questionLower.includes('standup')) {
    return questionsEmbeddings[0].embedding
  }

  if (questionLower.includes('open session')) {
    return questionsEmbeddings[1].embedding
  }

  return null
}

/**
 * Returns the dot product between two vectors.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number} The dot product.
 * @see https://en.wikipedia.org/wiki/Dot_product
 */
function dotProductSimilarity(a, b) {
  // We also could use a reduce instead.
  let dotProduct = 0

  for (let i = 0; i < a.length; i++) {
    // dot product is the sum of the products of each dimension
    dotProduct += a[i] * b[i]
  }

  return dotProduct
}
