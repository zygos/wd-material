import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// @ts-ignore - importing through a direct path propagates types faster
import type { AppRouter } from '@server/shared/trpc'
import { apiBase } from '@/config'
import SuperJSON from 'superjson'

export const trpc = createTRPCProxyClient<AppRouter>({
  // auto convert Date <-> string
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: apiBase,

      // send the access token with every request
      headers: () => {
        // TODO: attach the access token to the request Authorization header
        return {}
      },
    }),
  ],
})
