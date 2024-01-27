import { StatusCodes } from 'http-status-codes';

export default class MethodNotAllowed extends Error {
  status: number;

  constructor(message: string = 'Method not allowed') {
    super(message);
    this.status = StatusCodes.METHOD_NOT_ALLOWED;
  }
}
