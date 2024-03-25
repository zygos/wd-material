import { StatusCodes } from 'http-status-codes';

export default class BadRequest extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}
