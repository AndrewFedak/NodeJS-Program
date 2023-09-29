import { EntityManager } from '@mikro-orm/core'
import { SqlEntityRepository } from '@mikro-orm/postgresql'

import { UserDataModel } from '../config/data-models/user'

import { User } from './users.entity'

export type IUsersRepository = {
  getUserById(userId: string): Promise<User | null>
}

export class UsersRepository implements IUsersRepository {
  private _ormUsersRepository: SqlEntityRepository<UserDataModel>
  constructor(_em: EntityManager) {
    this._ormUsersRepository = _em.getRepository(UserDataModel)
  }
  async getUserById(userId: string): Promise<User | null> {
    const userDataModel = await this._ormUsersRepository.findOne({
      id: userId,
    })
    if (!userDataModel) {
      return null
    }
    return UserDataModel.toDomain(userDataModel)
  }
}
