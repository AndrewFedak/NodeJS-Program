import { HttpStatus } from './http-statuses.js'
import { HttpException } from './http.exceptions.js'

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN)
  }
}
