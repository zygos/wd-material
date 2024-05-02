import { pick } from 'lodash-es'
import db from '@/database'

type Article = {
  id: number
  title: string
  content: string
}

type ArticleWithoutId = Omit<Article, 'id'>

// defining clear roles for our types
type ArticleInsertable = ArticleWithoutId
type ArticleUpdateable = ArticleWithoutId

// listing all columns explicitly
const keys: readonly (keyof Article)[] = ['id', 'title', 'content']
const columns = keys.join(', ')

// Since our model is defining the type (shape) of our data,
// it is also responsible for providing some methods
// to make sure that provided data is of the correct shape.

/**
 * Takes an object of an unknown shape and returns a subset of it
 * Article that can be used to create a new article.
 */
export function parseInsertable(
  object: Record<string, unknown>
): ArticleInsertable {
  // naive object validation
  if (typeof object !== 'object' || object === null) {
    throw new Error('Article must be an object')
  }

  if (typeof object.title !== 'string') {
    throw new Error('Article title must be a string')
  }

  if (typeof object.content !== 'string') {
    throw new Error('Article content must be a string')
  }

  // we keep only the all other keys
  return {
    title: object.title,
    content: object.content,
  }
}

/**
 * Takes an object of an unknown shape and returns a subset of it
 * Article that can be used to update an existing article.
 */
export function parseUpdateable(
  object: Record<string, unknown>
): ArticleUpdateable {
  // naive object validation
  if (typeof object !== 'object' || object === null) {
    throw new Error('Article must be an object')
  }

  if ('title' in object && typeof object.title !== 'string') {
    throw new Error('Article title must be a string')
  }

  if ('content' in object && typeof object.content !== 'string') {
    throw new Error('Article content must be a string')
  }

  // using a helper function from lodash
  return pick(object, ['title', 'content']) as Pick<
    Article,
    'title' | 'content'
  >
}

export function findAll() {
  return db.prepare(`SELECT ${columns} FROM article`).all() as Article[]
}

export function findById(articleId: number) {
  return db
    .prepare(`SELECT ${columns} FROM article WHERE id = ?`)
    .get(articleId) as Article | undefined
}

export function create(articleBody: ArticleInsertable) {
  return db
    .prepare(
      `INSERT INTO article (title, content)
      VALUES (?, ?)
      RETURNING ${columns}`
    )
    .get(articleBody.title, articleBody.content) as Article | undefined
}

export function patch(articleId: number, data: Partial<ArticleUpdateable>) {
  if (Object.keys(data).length === 0) {
    // Empty patch, we don't need to do anything.
    // We still want to have a consistent return value
    // as if we had actually updated the article.
    return findById(articleId)
  }

  const updates = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ')

  return db
    .prepare(
      `UPDATE article
      SET ${updates}
      WHERE id = ?
      RETURNING ${columns}`
    )
    .get(...Object.values(data), articleId) as Article | undefined
}

export function remove(articleId: number) {
  return db
    .prepare(
      `DELETE FROM article
      WHERE id = ?
      RETURNING ${columns}`
    )
    .get(articleId) as Article | undefined
}
