import type { Database } from '@server/database'
import { type ArticlePublic, articleKeysPublic } from '@server/entities/article'

type Pagination = {
  offset: number
  limit: number
}

export function articleRepository(db: Database) {
  return {
    async findAll({ offset, limit }: Pagination): Promise<ArticlePublic[]> {
      return db
        .selectFrom('article')
        .select(articleKeysPublic)
        .orderBy('id', 'desc')
        .offset(offset)
        .limit(limit)
        .execute()
    },

    async findById(articleId: number): Promise<ArticlePublic | undefined> {
      return db
        .selectFrom('article')
        .select(articleKeysPublic)
        .where('id', '=', articleId)
        .executeTakeFirst()
    },

    async hasUserId(articleId: number, userId: number): Promise<boolean> {
      const article = await db
        .selectFrom('article')
        .select('userId')
        .where('id', '=', articleId)
        .executeTakeFirst()

      return article?.userId === userId
    },
  }
}

export type ArticleRepository = ReturnType<typeof articleRepository>
