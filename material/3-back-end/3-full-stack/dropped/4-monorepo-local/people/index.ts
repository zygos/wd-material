import { Database, Person } from '@server/database'
import { jsonRoute } from '@server/utils/middleware'
import { Router } from 'express'
import findPeople from './findPeople'

export default (db: Database) => {
  const router = Router()
  const repository = db.getRepository(Person)

  router.get('/', jsonRoute(findPeople(repository)))

  return router
}
