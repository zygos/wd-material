import NotFound from '@/utils/errors/NotFound';

export class CommentNotFound extends NotFound {
  constructor(message = 'Comment not found') {
    super(message);
  }
}
