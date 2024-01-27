import NotFound from '@/utils/errors/NotFound';

export class UserNotFound extends NotFound {
  constructor(message = 'User not found') {
    super(message);
  }
}
