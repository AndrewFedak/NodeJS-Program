export class User {
    constructor({ id, name, email, hobbies }) {
        this.id = +id
        this.name = name
        this.email = email
        this.hobbies = hobbies
    }
    static from(user) {
        return new User(user)
    }
    updateCredentials(newUserInfo) {
        for(const key in newUserInfo) {
            if(newUserInfo[key]) {
                this[key] = newUserInfo[key]
            }
        }
    }
    addHobby(hobby) {
        if(!this.hobbies.includes(hobby)) {
            this.hobbies = this.hobbies.concat([hobby])
        }
        return true
    }
    deleteHobby(hobbyToDelete) {
        this.hobbies = this.hobbies.filter((hobby) => hobby !== hobbyToDelete)
        return true
    }
}