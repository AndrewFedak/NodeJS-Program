class User {
    constructor({ id, name, email, hobbies }) {
        this.id = id
        this.name = name
        this.email = email
        this.hobbies = hobbies
    }
    static from(user) {
        return new User(user)
    }
    updateInfo(newUserInfo) {
        for(const key in newUserInfo) {
            this[key] = newUserInfo[key]
        }
    }
}

module.exports = { User }