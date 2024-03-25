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
