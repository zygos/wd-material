1. Setup the project.
2. Write a list of E2E tests.
3. Write your first acceptance test. Now, we will start with signup, as that is the first thing a user will do.

```ts
import { test, expect } from '@playwright/test'

test('visitor can signup', async ({ page }) => {
  await page.goto('/signup')

  const form = page.getByRole('form', { name: 'Signup' })
  await form.locator('input[type="email"]').fill('email@domain.com')
  await form.getByLabel('input[type="password"]').nth(0).fill('password')
  await form.getByLabel('input[type="password"').nth(1).fill('password')

  await expect(page.getByTestId('signup-success-message')).toBeHidden()
  await form.getByRole('button', { name: 'Signup' }).click()

  await expect(page.getByTestId('signup-success-message')).toBeVisible()
})
```

4. Run your first test `npm run test:e2e:chromium`, or using VS Code Playwright extension.

If you get playwright complaining that you do not have the browsers installed, you can either:
- run "Test: Install Playwright Browsers"
- run `npx playwright install`

This will install selected browsers. Given that we are focusing on the back-end for now, you can select to install only a single browser, we recommend Chromium or Firefox, as Safari tends to be a bit slower for running your E2E in our experience.

5.
