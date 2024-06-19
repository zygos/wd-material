import express from 'express'
import articles from './modules/articles/controller'
import comments from './modules/comments/controller'
import users from './modules/users/controller'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'

export default function createApp(db: Database) {
  const app = express()

  app.use(express.json())

  app.use('/articles', articles(db))
  app.use('/comments', comments(db))
  app.use('/users', users(db))

  app.use(jsonErrorHandler)

  return app
}
