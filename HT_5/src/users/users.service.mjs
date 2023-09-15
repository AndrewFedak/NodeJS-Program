import { BadRequestException } from "../exceptions/bad-request.exception.mjs"
import { NotFoundException } from "../exceptions/not-found.exception.mjs"
import { User } from "./entities/user.mjs"

export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }
    getList() {
        return this.usersRepository.getList()
    }
    get(id) {
        const user = this.usersRepository.get(id)
        if(!user) {
            throw new NotFoundException('User is not found')
        }

        return user
    }
    create(createUserDto) {
        const newUser = new User({
            id: Date.now(),
            ...createUserDto
        })

        this.usersRepository.create(newUser)

        return newUser
    }
    partiallyUpdate(id, updateUserDto) {
        const currentUser = this.get(id)

        currentUser.updateCredentials(updateUserDto)

        const result = this.usersRepository.update(id, currentUser)
        if (result === 0) {
            throw new Error('User was not updated')
        }

        return currentUser
    }
    delete(id) {
        const result = this.usersRepository.delete(id)
        if (result === 0) {
            throw new BadRequestException('User was not deleted')
        }

        return true
    }
    getUserHobbies = (userId) => {
        const user = this.get(userId)
        return user.hobbies
    }
    addHobby = (userId, hobby) => {
        const user = this.get(userId)

        user.addHobby(hobby)

        const result = this.usersRepository.update(user.id, user)
        if(result === 0) {
            throw new BadRequestException('Hobby was not added')
        }

        return true
    }
    deleteHobby = (userId, hobbyName) => {
        const user = this.get(userId)

        user.deleteHobby(hobbyName)

        const result = this.usersRepository.update(user.id, user)
        if(result === 0) {
            throw new BadRequestException('Hobby was not deleted')
        }

        return true
    }
}