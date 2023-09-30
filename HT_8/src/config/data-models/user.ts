import { Schema, model } from 'mongoose'

import { User as UserEntity } from '@src/users/users.entity'

interface IUser {
  _id: string
}
const userSchema = new Schema<IUser>({
  _id: { type: 'String' },
})
const User = model<IUser>('User', userSchema)

export class UserDataModel extends User {
  constructor(data: IUser) {
    super(data)
  }

  static toDomain({ _id }: IUser): UserEntity {
    return new UserEntity(_id)
  }

  static fromDomain({ id }: UserEntity): IUser {
    return new User<IUser>({ _id: id })
  }
}
