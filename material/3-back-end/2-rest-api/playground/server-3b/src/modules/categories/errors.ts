import NotFound from '@/utils/errors/NotFound';

export class CategoryNotFound extends NotFound {
  constructor(message = 'Category not found') {
    super(message);
  }
}
