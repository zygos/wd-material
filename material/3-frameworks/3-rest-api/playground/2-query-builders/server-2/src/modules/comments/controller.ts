import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as comments from './repository'
import * as schema from './schema'

const router = Router()

router.get('/', async (req, res) => {
  try {
    let commentList

    if (req.query.articleId) {
      // /comments?articleId=1
      const articleId = Number(req.query.articleId)

      if (!Number.isInteger(articleId)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Invalid articleId',
        })
        return
      }

      commentList = comments.findByArticleId(articleId)
    } else {
      commentList = comments.findAll()
    }

    res.status(StatusCodes.OK).json(commentList)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: (error as Error).message,
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const body = schema.parseInsertable(req.body)
    const comment = comments.create(body)

    res.status(StatusCodes.CREATED).json(comment)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: (error as Error).message,
    })
  }
})

export default router
