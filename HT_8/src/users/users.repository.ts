import { UserDataModel } from '../config/data-models/user'

import { User } from './users.entity'

export interface IUsersRepository {
  getUserById(userId: string): Promise<User | null>
}

export class UsersRepository implements IUsersRepository {
  constructor() {}
  async getUserById(userId: string): Promise<User | null> {
    const userDataModel = await UserDataModel.findById(userId)
    if (!userDataModel) {
      return null
    }
    return UserDataModel.toDomain(userDataModel)
  }
}
