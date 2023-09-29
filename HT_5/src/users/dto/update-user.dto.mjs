export class UpdateUserDto {
    constructor(body) {
        this.validatePartial(body)
    }
    validatePartial(body) {
        if(body) {
            return null;
        }

        const { name, email } = body
        if (name) {
            this.name = name
        }
        if (email) {
            this.email = email
        }
    }
}