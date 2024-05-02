import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as comments from './repository'
import * as schema from './schema'
import { jsonRoute } from '@/utils/middleware'
import BadRequest from '@/utils/errors/BadRequest'

const router = Router()

router
  .route('/')
  .get(
    jsonRoute(async (req) => {
      if (req.query.articleId) {
        // /comments?articleId=1
        const articleId = Number(req.query.articleId)

        if (!Number.isInteger(articleId)) {
          throw new BadRequest('articleId must be an integer')
        }

        // 1st method - repository provides a specific function for this query
        return comments.findByArticleId(articleId)

        // 2nd method - repository does not provide a specific function for this query
        // but provides a generic method for querying by any Kysely expression.
        // return comments.find(({ eb }) => eb('articleId', '=', articleId));

        // 3rd method - ideally, we would use a layer hiding the fact that we
        // use Kysely or SQL in general, and provide a more convenient API.
        // Then, we could do something like: (not implemented)
        // return comments.findBy({ articleId });
      }

      return comments.findAll()
    })
  )
  .post(
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body)

      return comments.create(body)
    }, StatusCodes.CREATED)
  )

export default router
