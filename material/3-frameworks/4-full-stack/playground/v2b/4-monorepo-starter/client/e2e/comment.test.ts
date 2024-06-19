import { test, expect } from '@playwright/test'
import { asUser, trpc } from './utils/api'
import { fakeArticle, fakeComment, fakeUser } from './utils/fakeData'

test.describe.serial('see an article and its comments', () => {
  test('user can comment on an article', async ({ page }) => {
    // Give (Arrange)
    // some user has an article
    const article = await asUser(page, fakeUser(), () => trpc.article.create.mutate(fakeArticle()))

    // another user tries to comment on that article
    await asUser(page, fakeUser(), async () => {
      // When (Act)
      await page.goto(`/article/${article.id}`)
      const comment = fakeComment()
      await page.getByRole('textbox', { name: 'Comment' }).fill(comment.content)
      await page.locator('button[type="submit"]').click()

      // Then (Assert)
      // expect to see our created comment in the list of comments
      const commentList = page.getByRole('list', { name: 'Comments' })
      const commentLatest = commentList.getByRole('listitem').first()
      await expect(commentLatest).toContainText(comment.content)
    })
  })

  test('visitors can see article comments', async ({ page }) => {
    // Give (Arrange) - setup through API, so we do not rely on the UI
    // one user has an article
    const article = await asUser(page, fakeUser(), async () => {
      return await trpc.article.create.mutate(fakeArticle())
    })

    // another user has a comment on that article
    const comment = await asUser(page, fakeUser(), async () => {
      return await trpc.comment.post.mutate(
        fakeComment({
          articleId: article.id,
        })
      )
    })

    // non-logged in visitor should see the article
    // When (Act)
    await page.goto(`/article/${article.id}`)

    // Then (Assert)
    // expect to see our created comment as the first comment
    const commentList = page.getByRole('list', { name: 'Comments' })
    const commentLatest = commentList.getByRole('listitem').first()
    await expect(commentLatest).toContainText(comment.content)
  })
})

test.describe('reporting comment as spam', () => {
  test('author can report a comment as spam', async ({ page }) => {
    // Give (Arrange)
    const author = fakeUser()
    const article = await asUser(page, author, async () => {
      // one user has an article
      return await trpc.article.create.mutate(fakeArticle())
    })

    const userOther = fakeUser()
    const comment = await asUser(page, userOther, async () => {
      // another user has a comment on that article
      return await trpc.comment.post.mutate(
        fakeComment({
          articleId: article.id,
        })
      )
    })

    // When (Act)
    await asUser(page, author, async () => {
      await page.goto(`/article/${article.id}`)
      const commentList = page.getByRole('list', { name: 'Comments' })

      const commentElement = commentList
        .getByTestId('comment')
        .filter({
          hasText: comment.content,
        })
        .first()

      await expect(commentElement).toBeVisible()

      await commentElement.getByTestId('markAsSpam').click()

      // Then (Assert)
      await expect(commentElement).not.toBeVisible()

      // make sure the comment stays hidden after a page reload
      await page.reload()
      await expect(commentElement).not.toBeVisible()
    })
  })
})
