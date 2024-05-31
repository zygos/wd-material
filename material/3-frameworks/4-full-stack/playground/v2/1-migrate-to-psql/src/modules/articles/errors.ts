import NotFound from '@/utils/errors/NotFound'

export class ArticleNotFound extends NotFound {
  constructor(message = 'Article not found') {
    super(message)
  }
}
