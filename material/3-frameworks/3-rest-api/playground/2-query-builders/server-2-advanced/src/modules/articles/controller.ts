import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as articles from './repository'
import * as schema from './schema'
import { jsonRoute } from '@/utils/middleware'
import { ArticleNotFound } from './errors'

const router = Router()

router
  .route('/')
  .get(jsonRoute(articles.findAll))
  .post(
    jsonRoute(async (req) => {
      const body = schema.parseInsertable(req.body)

      return articles.create(body)
    }, StatusCodes.CREATED)
  )

router
  .route('/:id(\\d+)')
  .get(
    jsonRoute(async (req) => {
      const id = schema.parseId(req.params.id)
      const record = await articles.findById(id)

      if (!record) throw new ArticleNotFound()

      return record
    })
  )
  .patch(
    jsonRoute(async (req) => {
      const id = schema.parseId(req.params.id)
      const bodyPatch = schema.parsePartial(req.body)
      const record = await articles.update(id, bodyPatch)

      if (!record) throw new ArticleNotFound()

      return record
    })
  )

export default router
