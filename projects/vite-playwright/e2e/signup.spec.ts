import { test, expect } from '@playwright/test'

test('visitor can signup', async ({ page }) => {
  await page.goto('/signup')

  const form = page.getByRole('form', { name: 'Signup' })
  await form.getByLabel('Email').type('email@domain.com')
  await form.getByLabel('First name').type('Jane')
  await form.getByLabel('Last name').type('Doe')
  await form.getByLabel('Password', { exact: true }).type('password')
  await form.getByLabel('Password (confirm)').type('password')

  await expect(page.getByTestId('signup-success-message')).toBeHidden()
  await form.getByRole('button', { name: 'Signup' }).click()

  await expect(page.getByTestId('signup-success-message')).toBeVisible()
})

test('visitor must enter all the fields to signup', async ({ page }) => {
  await page.goto('/signup')

  const form = page.getByRole('form', { name: 'Signup' })
  await form.getByLabel('Email').type('email@domain.com')
  await form.getByLabel('First name').type('Jane')
  // await form.getByLabel('Last name').type('Doe')
  await form.getByLabel('Password', { exact: true }).type('password')
  await form.getByLabel('Password (confirm)').type('password')
  // TODO: continue
})
