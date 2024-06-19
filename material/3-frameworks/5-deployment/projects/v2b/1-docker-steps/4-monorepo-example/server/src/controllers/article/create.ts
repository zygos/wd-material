import { articleSchema } from '@server/entities/article'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { articleRepository } from '@server/repositories/articleRepository'

// We want to allow only authenticated users to create articles.
// That's why we are using authenticatedProcedure instead of publicProcedure.
// authenticatedProcedure is a middleware that checks if there is an authentication token
// provided in the request. If there is, it will set the authenticated user in the context.
// Then we can access the authenticated user in the ctx.authUser property below.
// If you would import publicProcedure and use it instead of authenticatedProcedure,
// then the procedure resolver (main function) would throw a TypeScript error that
// authUser could be undefined.
export default authenticatedProcedure

  // inject article repository into the ctx.repos
  .use(provideRepos({ articleRepository }))

  .input(
    // user can provide the following fields
    articleSchema.pick({
      title: true,
      content: true,
    })
  )

  // Then, we would use a new property 'repos' instead of db.
  .mutation(async ({ input: articleData, ctx: { authUser, repos } }) => {
    const article = {
      ...articleData,
      userId: authUser.id,
    }

    const articleCreated = await repos.articleRepository.create(article)

    return articleCreated
  })
