Part 2: Vector Databases and Retrieval Augmented Generation

## Part introduction

We will upgrade our chatbot game to a new level in this part. We'll introduce **embeddings**, a mathematical way machines try to map the meaning behind some data. Then, we'll tackle **vector databases**, the super-efficient way to store and search this complex data. Finally, we will use it in a simple **Retrieval Augmented Generation** flow, often used to provide chatbots with long-term memory, to provide relevant documents to reduce "hallucinations" when asked business-related questions.

Even if you do not use a chatbot in your capstone project, the concepts you will learn in this part will be useful in many other projects, such as recommendation systems, search engines, anomaly detection, classification, sentiment analysis, etc.

We will reference some solutions and supplemental material that you can [download here](https://drive.google.com/file/d/1qI_FZsyBYp9lJTV-srpc6lqp4VS1f_eV/view?usp=sharing).

## Providing context to a chatbot (15 min)

Up until this point, our chatbot did not have access to a large amount of information. It could only answer factual questions that were provided in its training data. Even then, LLMs are prone to "hallucinating" information, which means they can generate plausible-sounding but false information. Due to their autoregressive nature, transformers-based LLMs tend to double down on their inaccuracies. For example, look at the following LLM prompt:

```md
User: What is the structure of a TC standup?
Chatbot:
```

Feeding this prompt to an LLM will continue generating text based on its training data. However, it does not necessarily know that TC refers to Turing College, and even if it did, it would not know how TC organizes its standups. It would likely make up some plausible-sounding information, but it would not be accurate.

One way to solve this problem is to provide the chatbot access to the relevant information that could help it answer questions. For example, imagine the following prompt.

```md
## Context
Turing College is an online college focused on tech fields. It offers data science, machine learning/AI, data engineering, and web development programs.
Turing College standup meetings are inspired by daily scrum meetings. A standup usually takes 30 - 45 minutes and has 3 separate parts:
- Learners sharing
- STL sharing
- Questions & discussions

---

## Conversation

User: What is the structure of a TC standup?
Chatbot:
```

Now, the chatbot is much more likely to provide an accurate answer. However, what if a user asks a question not covered in the prompt? For example, a user might ask, "How do you prepare for an Open Session?". The chatbot could not answer this question correctly because it was not covered in the prompt. It might give some tips, but these would be generic and not TC-specific.

We could provide all the information we have about Turing College to the chatbot, but this would not be a scalable solution as it would:

- require more computational resources (slower and more expensive)
- at some point, exceed the maximum token limit of the LLM if we have 1000s of documents

We could add some logic to check the question and provide a relevant prompt.

```js
// pseudo code
const question = // user's question provided a request

const context = getRelevantContext(question)
const prompt = formPrompt(question, context)
const response = await chatbot.generate(prompt)

function getRelevantContext(question) {
  if (question.includes('standup')) {
    return `A standup usually ...`
  } else if (question.includes('open session')) {
    return `Open Sessions are a great way to ...`
  }
}
```

## Exercise: Chatbot with context (1 hour)

**Task.** Add context to your chatbot to provide relevant information for Turing College-related questions.

We have provided a `0-documents` folder for this part of the materials. This folder contains a JSON file, `documentsPlain.json`, with some Turing College-related information. It includes four items: the first two are about Standups, and the last two are about Open Sessions.

If a learner asks a question containing "standup," include the first two documents in the prompt. If a learner asks a question containing "open session," include the last two documents in the prompt.

If the service supports it, you can include this additional context in a system prompt (preamble) or through a dedicated documents field in the chatbot's API.

**Solution.** Solution is provided in the `1-rag` folder.

## Embeddings (0.5 hour)

Trying to code all the possible cases for providing context is not scalable for a few reasons:

- We need to label a lot of data manually. What is relevant to a question about standups? What is appropriate for a question about the curriculum? This is a lot of work.
- Learners might ask questions using different wording, typos, etc.

Could we have a system that does this automatically? Ideally, we would like something like this:

```js
const documents = getRelevantDocuments(question, massiveListOfDocuments)
const prompt = formPrompt(question, documents)
const response = await chatbot.generate(prompt)
```

What if we retrieved the relevant context for a question before generating a response? We would want a program that could "understand" what is relevant.

What does it even mean for something to be relevant to a question? Can we measure the relevance of one piece of text to another? Could we capture the underlying meaning of the text, express it through numbers, and then, by comparing these numbers, measure the similarity between the pieces of text?

- Read: [What Are Word and Sentence Embeddings?](https://txt.cohere.com/sentence-word-embeddings/) (15 min)
- Read: [What is Similarity Between Sentences?](https://txt.cohere.com/what-is-similarity-between-sentences/) (15 min)

Embeddings are a way to represent words, sentences, or documents as a vector in a high-dimensional space. This representation allows us to measure the similarity between different pieces of text. It is used not just for LLMs, such as GPT, but also for recommendation systems, search engines, image generation with [Stable Diffusion](https://stable-diffusion-art.com/embedding/), and many other applications.

For our chat project, we will use embeddings for Turing College facts. Once a learner asks a question, we will use these embeddings to retrieve the most relevant facts. We will then provide these facts to the chatbot, which will generate a response based on the question and the retrieved facts.

## Exercise: Embeddings (1 hour)

First, we will work with embeddings without any additional tooling.

In `0-documents`, we have provided two additional files:
- `documentsEmbeddings.json` - file containing precomputed embeddings for a few text snippets about standups, open sessions, self-paced learning, and project reviews.
- `questionsEmbeddings.json` - file containing precomputed embeddings for two sample questions about standups and open sessions.

These embeddings were derived using OpenAI's `text-embedding-3-small` model and collapsed into 256 dimensions.

**Task.** Refactor your function for retrieving relevant documents to:

1. Select the appropriate mock embeddings for the provided question. For this exercise, you can assume that the question will always contain "standup" or "open session." So, for any question with "standup" in it, you would use the first embedding in `questionsEmbeddings.json`. You would use the second embedding in the file for any question with "open session" in it.
2. Compute the similarity between the question and each document. A simple way to do this is by using the dot product. We recommend turning off any AI assistance and trying to implement this yourself. We can express the logic behind the dot product in a few lines of code. For vectors `a` and `b`, the dot product is `a[0] * b[0] + a[1] * b[1] + ... + a[n] * b[n]`. The result is a single number, which can be used to measure the similarity between the (normalized) vectors. The higher the number, the more similar the vectors are.
3. Return a few (2 - 5) of the most similar documents that are then used to form a prompt for the chatbot.

**Examples.** If a chat participant asks the question, "Alan, what is the structure of a standup meeting?" your application should identify the following documents as having the highest similarity to the question (we have trimmed values for brevity):

```json
[
  {
    "topic": "Standup meetings",
    "content": "Structure of the standup meeting...",
    "similarity": 0.75
  },
  {
    "topic": "Standup meetings",
    "content": "Turing College offers multiple weekly standup meetings...",
    "similarity": 0.52
  },
  // ...
]
```

Alternatively, if a learner asks, "Alan, do you have some tips for an open session?" your application should identify the following documents as having the highest similarity to the question:

```json
[
  {
    "topic": "Open sessions",
    "content": "Tips for Open Sessions. 1. ...",
    "similarity": 0.68
  },
  {
    "topic": "Open sessions",
    "content": "Open Sessions participation. New learners...",
    "similarity": 0.61
  },
  {
    "topic": "Open sessions",
    "content": "Open sessions provide learners with...",
    "similarity": 0.57
  },
  // ...
]
```

**Solution.** Solution is provided in the `2-rag` folder.

## Retrieval Augmented Generation (RAG) (30 min)

// MUST: change resource as it is 404!
- Read: [Exploring Chat with Retrieval-Augmented Generation (RAG)](https://txt.cohere.com/exploring-chat-rag/) (30 min)

While the article focuses on using Cohere, the same principles apply to other models.

**Note.** Cohere mentions "preamble", sometimes called "system prompt" in other models, such as OpenAI's GPT family of models.

A basic RAG system consists of four steps:

1. The user sends a request to the server with some message, often a question.
2. The server calls some service to compute the embeddings of the user's message and compares it to previously calculated embeddings of the documents in the database. It then retrieves the most relevant documents.
3. The server provides the retrieved documents and the user's message to the chatbot service as plain text or through API options.
4. The server responds to the user with the chatbot's response.

We have already completed these steps with a few significant exceptions:

- instead of a database storing embeddings for our documents, we use a JSON file
- instead of computing embeddings for the question, we use precomputed mock embeddings

To fully implement this system, we would need to:

- use a vector database to store and query embeddings for our documents
- compute embeddings for the user's message once it is received

## Vector Databases (1 hour)

While we could use a regular database to store our embeddings, there are more efficient solutions. Whenever we want to compare the user's message and the documents, we must retrieve all the embeddings from the database and do our calculations in our application code. This approach is acceptable for a few records. Once we go beyond ~10_000 records, there is a noticeable delay, primarily due to the time it takes to transfer the data from the database to the application.

Could we perform these calculations directly in the database? After all, we make various other measurements in the database, such as comparing numbers, counting averages, sums, etc. We can do this with a **vector database**.

A vector database is just a database optimized for storing and retrieving vectors. It allows us to perform various operations on the vectors, such as quickly and efficiently finding the most similar vectors to a given vector.

- Watch: [What is a Vector Database?](https://www.youtube.com/watch?v=t9IDoenf-lo) (10 min)
- Watch: [Vector databases are so hot right now](https://www.youtube.com/watch?v=klTvEwg3oJ4) (5 min)

We will primarily focus on PostgreSQL with the `pgvector` extension, as it's free and can be started locally with just a few lines of code with Docker Compose. It can also be ported easily to a remote environment using Amazon RDS or "serverless" services like Neon. This can be handy if you use it in a deployed project.

Many other vector databases exist, such as Milvus, Faiss, and Pinecone. However, you might have an easier time porting the knowledge you gain from using `pgvector` to your capstone project.

- Read: [pgvector](https://github.com/pgvector/pgvector) - "Getting Started" section, no need to install anything yet (5 min)
- Review: [pgvector OpenAI Embeddings example](https://github.com/pgvector/pgvector-node/blob/c461cfc9b10b93a097fbf57667b2601561b92800/examples/openai/example.js) (15 min)

## Exercise: RAG Chatbot (4 hours)

**Task.**

1. Instead of using hard-coded question embeddings, compute the embeddings for the user's message on the fly.

2. Update your existing chatbot to use a vector database to store and retrieve embeddings for the provided Turing College documents. You can use the provided `documentsPlainAll.json` file.

Choose a service for embeddings:

- Free trial: [Cohere](https://txt.cohere.com/introducing-embed-v3/)
- Free trial: [Voyage](https://www.voyageai.com/)
- Paid: [OpenAI](https://platform.openai.com/docs/guides/embeddings)
- You are free to choose any other embedding model service.

Calculating embeddings is generally a very cheap operation, so you can afford to do it for every user's message. It is possible to calculate embeddings for dozens of books for a price of a euro, so no service should be prohibitively expensive for this task. However, we will use services that do not require a credit card for our exercises, at least at the time of writing.

You could continue using the same provider as in the previous part, but this will not affect the chatbot's performance as embeddings are not directly fed into text generation. Embeddings are only used to select the appropriate documents.

**Note on mixing models.** Since embeddings provide an internal representation of the text for a particular model, you can not compare embeddings between different models. For example, if you are storing embeddings for documents using OpenAI's model, you can not use Cohere's model to compute embeddings for the user's message. You would need to use the same model for both. However, you can use one service to deal with embeddings and another to generate responses.

**Note on model size.** Should you choose a smaller or a larger embedding model when given an option? Smaller models are faster and cheaper. Larger models can provide a more intricate and meaningfully relevant representation of the real world. A larger model would be more capable of enduring typos and idioms, referencing similar ideas across languages, and identifying complex context-dependent text features, such as sarcasm or references to obscure topics. For example, a less capable model might represent the phrase "under the weather" closer to "sunny" and "clouds". In contrast, a more capable model might place it closer to "feeling sick", as this is the real meaning we, as humans, associate it with. Of course, this is not an absolute rule, and nowadays, even small LLM-powered models can imply non-literal meanings.

**Recommended steps.**
1. Spin up a new database with the `pgvector` extension. You can use the following Docker compose file to start a new database:

```yaml
version: '3.8'

services:
  # spin up Postgres with pgvector
  postgres:
    # ankane is the maintainer of pgvector
    image: ankane/pgvector
    environment:
      POSTGRES_USER: turing
      POSTGRES_PASSWORD: turing
      POSTGRES_DB: demo
    ports:
      # using port 5435 to avoid conflicts with a local Postgres instance
      - "5435:5432"
```

2. Choose a way to interface with the database. You might want to use Node's `pgvector` package and some way to connect to the database, such as `pg-promise`, `node-postgres`, `kysely`, `knex`, `typeorm`, or any other package of your choice. You can find examples of how to use `pgvector` with any of these packages in the [pgvector-node repository](https://github.com/pgvector/pgvector-node).
3. On your server startup, make sure it has a table for your documents and, if necessary, seed the initial documents from the `documentsPlainAll.json` file and their embeddings. Since the embeddings depend on the model, you will need to retrieve them when seeding the database. Alternatively, you could handle this with some file you would manually run once, for example, `migration.js`.
4. Update your application to compute the embeddings for the user's message using the service of your choice.
5. Query the database to retrieve the most relevant documents for the user's message. The most common way to query embeddings is to use cosine similarity, equivalent to dot product, for normalized vectors. A few of the most relevant documents should be used to form a prompt for the chatbot.

**Solution.** Solution is provided in the `3-rag` folder. It uses Cohere for embeddings.

## Exercise: Bonus chatbot features (2 hours)

1. You probably noticed that the WebSocket connection is lost if you restart the socket server. We want to address this problem. How can you reconnect to the server if the connection is lost?
2. For a more interactive experience, you could add a "{Learner} is typing..." feature. You should add this status message to the chat UI when another learner starts typing. You should remove it when they send their message or delete it without sending it.
3. Display the username upfront. Right now, a new visitor needs to send a message to see their username. It would be nice if they could see their username before sending a message. Could you show the user's username in the chat UI as soon as they connect to the chat?

# Directions for further research (1 hour+)

- How would you split a long document into smaller pieces and store them in a vector database?
- In our current implementation, all user questions for the bot must contain "Alan". Wouldn't that prioritize the documents that mention "Alan" over those that do not? Wouldn't this prioritize documents with questions as they are meaningfully similar to the user's questions on the "question-like" dimension? How could you address this problem?
- How would you approach updating the documents in the database? For example, what if you wanted to add a new document or update an existing one?
- Are embeddings on one model compatible with embeddings from another model? For example, could you use embeddings from OpenAI's model to query a database with embeddings from Cohere's model?
