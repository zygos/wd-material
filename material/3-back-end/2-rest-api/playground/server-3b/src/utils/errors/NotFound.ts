import { StatusCodes } from 'http-status-codes';

export default class NotFound extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}
