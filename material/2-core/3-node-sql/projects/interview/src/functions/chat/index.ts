import contexts from './contexts'
import { z } from 'zod'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch,
})

export default async (conversation: Conversation) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: messageSystem },
      ...toApiMessages(conversation),
    ],
    model: 'gpt-3.5-turbo',
  })

  return completion.choices[0].message
}

const toApiMessages = () => {
  return { role: 'user', content: 'Say this is a test' }
}

export const Message = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
})

export const Conversation = z.object({
  messages: z.array(Message),
  hash: z.string(),
})
