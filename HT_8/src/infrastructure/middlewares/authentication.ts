import { RequestHandler } from 'express'

import { UnauthorizedRequestException } from '../exceptions/unauthorized-request.exception'

import { IUsersRepository } from '../../users/users.repository'

export class AuthenticationMiddleware {
  constructor(private _usersRepository: IUsersRepository) {}

  static init(usersRepository: IUsersRepository): RequestHandler {
    const authenticationMiddleware = new AuthenticationMiddleware(
      usersRepository,
    )
    return authenticationMiddleware.authenticate
  }

  authenticate: RequestHandler = async (req, res, next) => {
    const userId = req.headers['x-user-id']
    if (!userId) {
      return next(
        new UnauthorizedRequestException(
          'Header x-user-id is missing or no user with such id',
        ),
      )
    }
    const user = await this._usersRepository.getUserById(
      `${userId?.toString()}`,
    )
    if (!user) {
      return next(
        new UnauthorizedRequestException(
          'Header x-user-id is missing or no user with such id',
        ),
      )
    }
    res.locals.user = user
    next()
  }
}
