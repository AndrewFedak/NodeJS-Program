import { BadRequestException } from "../../exceptions/bad-request.exception.mjs"

export class CreateUserDto {
    constructor({ name, email, hobbies }) {
        if(!name) {
            throw new BadRequestException('Name is not defined')
        }
        if(!email) {
            throw new BadRequestException('Email is not defined')
        }
        if(!hobbies) {
            throw new BadRequestException('Hobbies is not defined')
        }
        this.name = name
        this.email = email
        this.hobbies = hobbies
    }
}