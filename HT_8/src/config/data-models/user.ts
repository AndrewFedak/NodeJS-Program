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

/* 
  By that simple case we see that

  Use case: Create user _-_ 
  Domain -> maps into -> Data Model (and inserts)
  Use case: Read user
  Data Model -> maps into -> Domain 

  By that simple case we see that Domain is decoupled from persistence concerns

  But Domain is still not secured from persistence since it exposes its inner nature (public properties)
  To get all benefits of encapsulation, we may increase privacy of Entities and expose it by applying Memento Pattern 

  After that refactoring _-_
  Use case: Create User
  Domain -> create Snapshot of current Domain structure -> map Snapshot into -> Data Model
  Use case: Read user
  Data Model -> create empty Snapshot of Domain structure and map Data Model values into Snapshot of Domain -> create Domain from prefilled Snapshot

  Thus, Domain and Data Model are decoupled and safe to be changed, when only just Snapshot needs to be updated.

  Keep in mind that while you will get a lot of benefits, it may take a lot of time to implement. 
  So, FIRST of all try to ask yourself 
    - will particular part of a system be worth of time and qulity that will be spent,
    - will it provide a lot of value to business
    - etc 
*/
