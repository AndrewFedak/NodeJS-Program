class UpdateUserDto {
    constructor(body) {
        this.validatePartial(body)
    }
    validatePartial({ name, email, hobbies }) {
        if (name) {
            this.name = name
        }
        if (email) {
            this.email = email
        }
        if (hobbies) {
            this.hobbies = hobbies
        }
    }
}

module.exports.UpdateUserDto = UpdateUserDto