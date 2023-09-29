import { ErrorRequestHandler } from 'express'

import { HttpException } from './http.exceptions'
import { HttpStatus } from './http-statuses'

import { ResponseDataAndError } from '../response-data-and-error'

export const ExceptionFilter: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof HttpException) {
    res.status(err.status).json(ResponseDataAndError.format(null, err))
  } else if (err instanceof Error) {
    res
      .status(HttpStatus.INTERNAL_ERROR)
      .json(ResponseDataAndError.format(null, new HttpException(err.message)))
  } else {
    res
      .status(HttpStatus.INTERNAL_ERROR)
      .json(ResponseDataAndError.format(null, new HttpException()))
  }
}
