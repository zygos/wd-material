import type { Database, Article } from '@server/database'
import { type ArticlePublic, articleKeysPublic } from '@server/entities/article'
import type { Insertable } from 'kysely'

type Pagination = {
  offset: number
  limit: number
}

export function articleRepository(db: Database) {
  return {
    async create(article: Insertable<Article>): Promise<ArticlePublic> {
      return db
        .insertInto('article')
        .values(article)
        .returning(articleKeysPublic)
        .executeTakeFirstOrThrow()
    },

    async findById(articleId: number): Promise<ArticlePublic | undefined> {
      return db
        .selectFrom('article')
        .select(articleKeysPublic)
        .where('id', '=', articleId)
        .executeTakeFirst()
    },

    async findAll({ offset, limit }: Pagination): Promise<ArticlePublic[]> {
      return db
        .selectFrom('article')
        .select(articleKeysPublic)
        .orderBy('id', 'desc')
        .offset(offset)
        .limit(limit)
        .execute()
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
