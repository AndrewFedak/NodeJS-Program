import { RequestHandler } from 'express'

import { ForbiddenException } from '../exceptions/forbidden-exception'

export class AuthorizationMiddleware {
  static isAdmin: RequestHandler = async (req, res, next) => {
    const currentUser = req.user

    if (currentUser.role !== 'admin') {
      return next(new ForbiddenException('Only Admin user can do such actions'))
    }

    return next()
  }
}
