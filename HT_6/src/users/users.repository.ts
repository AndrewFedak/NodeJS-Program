import { IInMemoryDatabase } from "../infrastructure/in-memory.database";

import { User } from "./users.entity";

export interface IUsersRepository {
    getUserById(userId: string): Promise<User | undefined>
}

export class UsersRepository implements IUsersRepository {
    constructor(
        private _db: IInMemoryDatabase
    ) {}
    async getUserById(userId: string): Promise<User | undefined> {
        return this._db.users.find(user => user.id === userId)
    }
}