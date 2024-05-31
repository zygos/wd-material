import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as schema from './schema'
import buildRepository from './repository'
import { jsonRoute, unsupportedRoute } from '@/utils/middleware'
import type { Database } from '@/database'
import BadRequest from '@/utils/errors/BadRequest'

export default (db: Database) => {
  const router = Router()
  const comments = buildRepository(db)

  router
    .route('/')
    .post(
      jsonRoute(async (req) => {
        const body = schema.parseInsertable(req.body)

        return comments.create(body)
      }, StatusCodes.CREATED)
    )
    .get(
      jsonRoute(async (req) => {
        // we would tend to move this validation logic also outside
        // of the request handler body
        const articleId = Number(req.query.articleId)

        if (!Number.isInteger(articleId)) {
          throw new BadRequest('Please provide a numeric article ID')
        }

        return comments.find(({ eb }) => eb('articleId', '=', articleId))
      })
    )

  router
    .route('/:id')
    .get(unsupportedRoute)
    .delete(unsupportedRoute)
    .patch(unsupportedRoute)
    .put(unsupportedRoute)

  return router
}
