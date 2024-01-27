import { test, expect } from '@playwright/test'

test('visitor can be greeted', async ({ page }) => {
  // Given (ARRANGE)
  await page.goto('/')

  // When (ACT)
  await page.getByLabel('Name').fill('Olivia')
  await page.locator('button[type="submit"]').click()

  const greeting = page.getByTestId('greeting')

  // Then (ASSERT)
  await expect(greeting).toContainText('Hello, Olivia!')
})
