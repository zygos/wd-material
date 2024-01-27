import { test, expect } from '@playwright/test'

test('visitor can see the homepage heading', async ({ page }) => {
  await page.goto('/')

  const heading = page.getByRole('heading', { name: 'Dogs', exact: true })
  await expect(heading).toBeVisible()
})

test('can add a good dog', async ({ page }) => {
  await page.goto('/')

  const dogs = page
    .getByRole('list', { name: 'Good dogs' })
    .getByRole('listitem')

  const dogCount = await dogs.count()

  await page.getByTestId('addGoodDog').click()
  await expect(dogs).toHaveCount(dogCount + 1)
})

test('can add a bad dog', async ({ page }) => {
  await page.goto('/')

  const dogs = page
    .getByRole('list', { name: 'Bad dogs' })
    .getByRole('listitem')

  const dogCount = await dogs.count()

  await page.getByTestId('addBadDog').click()
  await expect(dogs).toHaveCount(dogCount + 1)
})
