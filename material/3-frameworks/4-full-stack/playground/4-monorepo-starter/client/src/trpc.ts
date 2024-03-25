import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// @ts-ignore - importing through direct path propagates tRPC types faster
import type { AppRouter } from '@server/shared/trpc'
import { apiBase } from '@/config'
import SuperJSON from 'superjson'

export const trpc = createTRPCProxyClient<AppRouter>({
  // auto convert Date <-> string
  transformer: SuperJSON,

  links: [
    httpBatchLink({
      url: apiBase,

      // headers: () => {
      //   add an access token with every request
      // },
    }),
  ],
})
