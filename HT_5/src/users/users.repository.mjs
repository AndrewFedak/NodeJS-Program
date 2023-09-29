import { User } from "./entities/user.mjs"

export class UsersRepository {
    constructor(dbRef) {
        this.db = dbRef
    }
    getList() {
        return this.db.users.map(User.from)
    }
    get(id) {
        const user = this.db.users.find((user) => user.id === id)
        return user && User.from(user)
    }
    create(user) {
        return this.db.users.push(user)
    }
    update(id, updatedUser) {
        let affectedRows = 0
        this.db.users = this.db.users.map((user) => {
            if (user.id === id) {
                affectedRows++
                return updatedUser
            }
            return user
        })
        return affectedRows
    }
    delete(id) {
        let affectedRows = 0
        this.db.users = this.db.users.filter((user) => {
            if (user.id === id) {
                affectedRows++
                return false
            }
            return true
        })
        return affectedRows
    }
}