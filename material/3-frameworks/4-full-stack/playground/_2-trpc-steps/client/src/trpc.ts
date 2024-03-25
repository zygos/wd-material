import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@mono/server/src/shared/trpc'
import { apiOrigin, apiPath } from '@/config'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${apiOrigin}${apiPath}`,
    }),
  ],
})
