const { CreateUserDto } = require("./dto/create-user.dto")
const { UpdateUserDto } = require("./dto/update-user.dto")
const { UserResponseDto } = require("./dto/user-response.dto")

class UsersController {
    constructor(usersService) {
        this.usersService = usersService
    }
    init(app) {
        const baseRoute = '/users'
        app.get(`${baseRoute}`, this.getUsers)
        app.get(`${baseRoute}/:id`, this.getUser)
        app.post(`${baseRoute}`, this.create)
        app.update(`${baseRoute}/:id`, this.update)
        app.delete(`${baseRoute}/:id`, this.delete)
        
        //todo
        app.get(`${baseRoute}/:id/hobbies`, this.getUser)
        app.post(`${baseRoute}/:id/hobbies/:name`, this.delete)
        app.delete(`${baseRoute}/:id/hobbies/:name`, this.delete)
    }
    getUsers = (_req, res) => {
        const users = this.usersService.getList()
        return res.json(UserResponseDto.fromEntries(users))
    }
    getUser = (req, res) => {
        const user = this.usersService.get(+req.params.id)
        return res.json(UserResponseDto.from(user))
    }
    create = (req, res) => {
        const createUserDto = new CreateUserDto(req.body)

        const createdUser = this.usersService.create(createUserDto)

        return res.status(201).json(UserResponseDto.from(createdUser))
    }
    update = (req, res) => {
        const updateUserDto = new UpdateUserDto(req.body)

        const updatedUser = this.usersService.update(+req.params.id, updateUserDto)

        return res.json(UserResponseDto.from(updatedUser))
    }
    delete = (req, res) => {
        this.usersService.delete(+req.params.id)
        return res.send('Deleted')
    }
}

module.exports = { UsersController }