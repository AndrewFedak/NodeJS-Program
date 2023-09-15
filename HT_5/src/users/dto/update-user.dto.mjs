export class UpdateUserDto {
    constructor(body) {
        this.validatePartial(body)
    }
    validatePartial({ name, email }) {
        if (name) {
            this.name = name
        }
        if (email) {
            this.email = email
        }
    }
}