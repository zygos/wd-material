import express from 'express'
import articles from './modules/articles/controller'
import comments from './modules/comments/controller'
import users from './modules/users/controller'
import jsonErrorHandler from './middleware/jsonErrors'

const app = express()

app.use(express.json())

app.use('/articles', articles)
app.use('/comments', comments)
app.use('/users', users)

app.use(jsonErrorHandler)

export default app
