import { Entity, Loaded, PrimaryKey } from '@mikro-orm/core'

import { User } from '@src/users/users.entity'

@Entity()
export class UserDataModel {
  @PrimaryKey()
  id: string

  constructor(id: string) {
    this.id = id
  }

  static toDomain(userDataModel: Loaded<UserDataModel>): User {
    return new User(userDataModel.id)
  }

  static fromDomain(userDomainModel: User): UserDataModel {
    return new UserDataModel(userDomainModel.id)
  }
}
