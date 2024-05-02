import express from 'express'
import articles from './modules/articles/controller'
import comments from './modules/comments/controller'
import users from './modules/users/controller'

const app = express()

app.use(express.json())

app.use('/articles', articles)
app.use('/comments', comments)
app.use('/users', users)

export default app
