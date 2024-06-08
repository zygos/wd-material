import { apiOrigin, apiPath } from './config'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@mono/server/src/shared/trpc'
import type { Page } from '@playwright/test'
import superjson from 'superjson'
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

// You could add some helpers here to make it easier to test your API.
// Instead of going through the same signup/login steps for every test,
// you could create and login a fresh user for every test. If it is done
// through API, it will be much faster than going through the UI.
// As long as you have one flow that tests the UI signup/login, you can
// start relying on API for some more cumbersome E2E tasks.
// There are some alternative strategies, such as mocking the API or using
// a seeded database. However, that generally requires more front-to-back
// coordination and is more brittle to changes in the API.

export async function loginNewUser(page: Page, userLogin = fakeUser()) {
  // 1. Signup
  // 2. Login, get access token
  // 3. Go to any page to make sure we have access to page and localStorage
  // 4. Set access token in localStorage
  // 5. Set the access token in localStorage. This deals with implementation
  // details, so it is not ideal, but as long as we isolate it to a single
  // place, it should be fine.
}
