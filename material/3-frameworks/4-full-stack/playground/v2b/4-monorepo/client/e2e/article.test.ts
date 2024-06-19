import { test, expect } from '@playwright/test'
import { asUser } from './utils/api'
import { fakeArticle, fakeUser } from './utils/fakeData'

test.describe.serial('see an article and its comments', () => {
  const article = fakeArticle()

  test('user can create an article', async ({ page }) => {
    const author = fakeUser()

    await asUser(page, author, async () => {
      await page.goto('/dashboard/write-article')

      // enter article details
      const form = page.getByRole('form', { name: 'Article' })
      await form.getByRole('textbox', { name: 'Title' }).fill(article.title)
      await form.getByRole('textbox', { name: 'Content' }).fill(article.content)

      // click on a button to create an article
      await form.locator('button[type="submit"]').click()

      // wait for navigation to a article page
      await page.waitForURL(/.+\/\d+$/)

      // expect to see the article title in the heading
      const articleTitle = page.getByRole('heading', { name: article.title })

      await expect(articleTitle).toBeVisible()

      // expect to see the article content
      const articleContent = page.getByText(article.content)

      await expect(articleContent).toBeVisible()
    })
  })

  test('visitor can see a created article in the homepage', async ({ page }) => {
    await page.goto('/')
    const articleList = page.getByTestId('articleList')
    await expect(articleList).toBeVisible()

    await expect(articleList).toContainText(article.title)
  })

  test('visitor can visit an article page', async ({ page }) => {
    await page.goto('/')
    await page.getByText(article.title).click()

    await page.waitForURL(/.+\/\d+$/)

    const articleTitle = page.getByRole('heading', { name: article.title })
    await expect(articleTitle).toBeVisible()

    const articleContent = page.getByText(article.content)
    await expect(articleContent).toBeVisible()
  })
})
