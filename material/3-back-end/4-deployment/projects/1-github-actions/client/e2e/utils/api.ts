/* eslint-disable */
import { apiOrigin, apiPath } from './config'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@mono/server/src/shared/trpc'
import type { Page } from '@playwright/test'
import { superjson } from './superjson/common'
import { fakeUser } from './fakeData'

// Playwright might have incorrectly typed `trpc` as `any`.
const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${apiOrigin}${apiPath}`,
    }),
  ],
})
