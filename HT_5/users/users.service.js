const { User } = require("./entities/user")

class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }
    getList() {
        return this.usersRepository.getList()
    }
    get(id) {
        const user = this.usersRepository.get(id)
        if(!user) {
            throw new Error('User is not found')
        }
        return user
    }
    create(createUserDto) {
        const newUser = new User({
            id: Date.now(),
            ...createUserDto
        })

        const result = this.usersRepository.create()
        if (result === 0) {
            throw new Error('User was not created')
        }

        return newUser
    }
    update(id, updateUserDto) {
        const currentUser = this.get(id)

        currentUser.updateInfo(updateUserDto)

        const result = this.usersRepository.update(id, currentUser)
        if (result === 0) {
            throw new Error('User was not updated')
        }

        return currentUser
    }
    delete(id) {
        const result = this.usersRepository.delete(id)

        if (result === 0) {
            throw new Error('User was not deleted')
        }

        return true
    }
}

module.exports = { UsersService }