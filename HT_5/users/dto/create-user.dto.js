class CreateUserDto {
    constructor({ name, email, hobbies }) {
        if(!name) {
            throw new Error('Name is not defined')
        }
        if(!email) {
            throw new Error('Email is not defined')
        }
        if(!hobbies) {
            throw new Error('hobbies is not defined')
        }
        this.name = name
        this.email = email
        this.hobbies = hobbies
    }
}

module.exports.CreateUserDto = CreateUserDto