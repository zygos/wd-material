import documents from './documentsPlain.json' assert { type: 'json' }

/**
 * Returns the relevant documents for the given question.
 * @param {string} question
 * @returns {string[]} The relevant documents.
 */
export function getRelevantDocuments(question) {
  const questionLowercase = question.toLowerCase()

  // Here we are assuming that only a single topic would be mentioned in the question.
  if (questionLowercase.includes('standup')) {
    return documents
      .filter((doc) => doc.topic === 'Stand-up meetings')
  } else if (questionLowercase.includes('open session')) {
    return documents
      .filter((doc) => doc.topic === 'Open sessions')
  }

  return []
}
