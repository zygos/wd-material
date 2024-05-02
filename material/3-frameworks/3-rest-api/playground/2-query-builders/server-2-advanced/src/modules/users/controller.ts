import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as users from './repository'
import * as schema from './schema'
import { jsonRoute } from '@/utils/middleware'

const router = Router()

router.route('/').post(
  jsonRoute(async (req) => {
    const body = schema.parseInsertable(req.body)

    return users.create(body)
  }, StatusCodes.CREATED)
)

export default router
