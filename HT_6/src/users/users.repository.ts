import { IDatabase } from "../infrastructure/idatabase";

import { User } from "./users.entity";

export interface IUsersRepository {
    getUserById(userId: string): Promise<User | undefined>
}

export class UsersRepository implements IUsersRepository {
    constructor(
        private _db: IDatabase
    ) {}
    async getUserById(userId: string): Promise<User | undefined> {
        return this._db.users.find(user => user.id === userId)
    }
}