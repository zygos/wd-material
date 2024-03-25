import { openAiKey, gptModel } from '../../config.js'
import { BOARD_SEPARATOR } from './consts.js'

async function getAiResponse(prompt, boardState) {
  const messages = [
    {
      role: 'system',
      content: prompt,
    },
    {
      role: 'user',
      content: [
        'Here is the current game state:',
        BOARD_SEPARATOR,
        boardState,
        BOARD_SEPARATOR,
        '',
        `What is your move? Respond with your reasoning what you should do to win and then with the new state of the board wrapped in ${BOARD_SEPARATOR} after your move is done.`,
      ].join('\n'),
    },
  ]

  if (!openAiKey) {
    throw new Error('OpenAI key is not set')
  }

  const request = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: gptModel,
      messages,
      temperature: 0.2,
      max_tokens: 200,
    }),
    timeout: 20000,
  })

  const response = await request.json()

  return response.choices[0].message.content
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 30000 } = options

  const controller = new AbortController()
  const timerId = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })

  clearTimeout(timerId)

  return response
}

const retryable = (fn, retries) => async (...args) => {
  try {
    return await fn(...args)
  } catch (error) {
    if (retries > 0) {
      return retryable(fn, retries - 1)(...args)
    } else {
      throw error
    }
  }
}

export default retryable(getAiResponse, 3)
