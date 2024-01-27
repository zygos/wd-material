import { test as it, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
it('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
})

it.describe('homepage', () => {
  it('displays a counter', async ({ page }) => {
    await page.goto('/counter')
    await expect(page.getByTestId('counter')).toBeVisible()
  })

  it('allows incrementing a counter', async ({ page }) => {
    await page.goto('/counter')
    await expect(page.getByTestId('counter')).toHaveText('0')
    await page.getByTestId('counter').click()
    await expect(page.getByTestId('counter')).toHaveText('1')
    await page.getByTestId('counter').click()
    await expect(page.getByTestId('counter')).toHaveText('2')
  })
})
