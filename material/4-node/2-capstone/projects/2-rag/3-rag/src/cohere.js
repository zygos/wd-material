import { CohereClient } from 'cohere-ai'

export class Cohere {
  #api
  #embeddingModel

  constructor({ apiKey }) {
    this.#api = new CohereClient({
      token: apiKey,
    })

    this.#embeddingModel = 'embed-english-v3.0'
  }

  /**
   * Returns the embedding for the given string. Used for storing embeddings.
   * @param {string} text
   */
  async getDocumentEmbedding(text) {
    const response = await this.#api.embed({
      texts: [text],
      model: this.#embeddingModel,
      inputType: 'search_document',
    })

    return response.embeddings[0]
  }

  /**
   * Returns the embedding for the given string. Used for search queries.
   * @param {string} text
   */
  async getQueryEmbedding(text) {
    const response = await this.#api.embed({
      texts: [text],
      model: this.#embeddingModel,
      inputType: 'search_query',
    })

    return response.embeddings[0]
  }
}
