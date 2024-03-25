import getResponse, { Conversation, Message } from './chat'

const handler: ExportedHandler = {
  async fetch(request, env, ctx) {
    const results = await getResponse(response)

    return new Response(results, init)
  },
}

export default handler
