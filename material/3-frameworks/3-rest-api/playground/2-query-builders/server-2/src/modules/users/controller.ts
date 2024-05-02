import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as users from './repository'
import * as schema from './schema'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const body = schema.parseInsertable(req.body)
    const user = users.create(body)

    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: (error as Error).message,
    })
  }
})

export default router
