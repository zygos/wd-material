/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Database, Comment, DB } from '@server/database'
import { type CommentPublic, commentKeysPublic } from '@server/entities/comment'
import { type UserPublic, userKeysPublic } from '@server/entities/user'
import { prefixTable } from '@server/utils/strings'
import {
  type AliasedRawBuilder,
  type ExpressionBuilder,
  type Insertable,
} from 'kysely'
import { jsonBuildObject, jsonObjectFrom } from 'kysely/helpers/postgres'

export function commentRepository(db: Database) {
  return {
    async create(comment: Insertable<Comment>): Promise<CommentPublic> {
      return db
        .insertInto('comment')
        .values(comment)
        .returning(commentKeysPublic)
        .returning(withAuthor)
        .executeTakeFirstOrThrow()
    },

    async markAsSpam(id: number): Promise<CommentPublic> {
      return db
        .updateTable('comment')
        .set({ isSpam: true })
        .where('id', '=', id)
        .returning(commentKeysPublic)
        .returning(withAuthor)
        .executeTakeFirstOrThrow()
    },

    /**
     * Retrieves all article comments with their author (user).
     */
    async findByArticleId(articleId: number): Promise<CommentPublic[]> {
      /*
       * Demonstration of multiple different methods to achieve the same
       * result - comments with nested authors.
       */

      /*
       * Method A - join and restructure the result manually.
       * We would use left join if there was a possibility that
       * a comment would not have an author.
       */
      // const comments = await db
      //   .selectFrom('comment')
      //   .innerJoin('user', 'comment.userId', 'user.id')
      //   .where('articleId', '=', articleId)
      //   .where('isSpam', '!=', true)
      //   .select([
      //     // id -> comment.id, articleId -> comment.articleId, etc.
      //     ...prefixTable('comment', commentKeysPublic),
      //     'firstName',
      //     'lastName',
      //   ])
      //   .orderBy('comment.id', 'asc')
      //   .execute()
      //
      // // move all author fields to a nested author object
      // return comments.map(({ firstName, lastName, ...comment }) => ({
      //   ...comment,
      //   author: {
      //     id: comment.userId,
      //     firstName,
      //     lastName,
      //   },
      // }))

      /*
       * Method B - using JOIN + json_build_object Postgres function to nest
       * the author for us automatically.
       */
      // return db
      //   .selectFrom('comment')
      //   .innerJoin('user', 'comment.userId', 'user.id')
      //   .select(prefixTable('comment', commentKeysPublic))
      //   .select(withAuthorJoin)
      //   .where('articleId', '=', articleId)
      //   .groupBy(['user.id', 'comment.id'])
      //   .orderBy('comment.id', 'asc')
      //   .execute()

      /* Method C - json_agg + subquery
       * This is the simplest method to understand and to use,
       * so we will keep it in this example. However, you might
       * prefer JOIN for performance reasons. As long as you have
       * test coverage, switching between these methods should be
       * relatively easy.
       * https://kysely.dev/docs/recipes/relations.
       */
      return db
        .selectFrom('comment')
        .select(commentKeysPublic)
        .select(withAuthor)
        .where('articleId', '=', articleId)
        .where('isSpam', '=', false)
        .orderBy('comment.id', 'asc')
        .execute()
    },
  }
}

function withAuthorJoin(eb: ExpressionBuilder<DB, 'user'>) {
  return jsonBuildObject(
    Object.fromEntries(
      userKeysPublic.map((key) => [key, eb.ref(`user.${key}`)])
    )
    // adding a type assertion to inform TS that author
    // is not going to be null - we know that userId is a
    // non-nullable field in the comment table.
  ).as('author') as AliasedRawBuilder<UserPublic, 'author'>
}

function withAuthor(eb: ExpressionBuilder<DB, 'comment'>) {
  return jsonObjectFrom(
    eb
      .selectFrom('user')
      .select(userKeysPublic)
      .whereRef('user.id', '=', 'comment.userId')
  ).as('author') as AliasedRawBuilder<UserPublic, 'author'>
}

export type CommentRepository = ReturnType<typeof commentRepository>
