import { PROCESS_ENV } from "../../env.mjs"

import { Links } from "../infrastructure/links.mjs"

import { CreateUserDto } from "./dto/create-user.dto.mjs"
import { UpdateUserDto } from "./dto/update-user.dto.mjs"
import { UserResponseDto } from "./dto/user-response.dto.mjs"
import { UserWithHobbiesLinkResponseDto } from "./dto/user-with-hobbies-link-response.dto.mjs"

export class UsersController {
    baseRoute = '/users'
    constructor(usersService) {
        this.usersService = usersService
    }
    init(app) {
        app.get(`${this.baseRoute}`, this.getUsers)
        app.get(`${this.baseRoute}/:id`, this.getUser)
        app.post(`${this.baseRoute}`, this.create)
        app.patch(`${this.baseRoute}/:id`, this.patch)
        app.delete(`${this.baseRoute}/:id`, this.delete)

        app.get(`${this.baseRoute}/:id/hobbies`, this.getUserHobbies)
        app.post(`${this.baseRoute}/:id/hobbies/:name`, this.addHobby)
        app.delete(`${this.baseRoute}/:id/hobbies/:name`, this.deleteHobby)
    }
    getUsers = (_req, res) => {
        const users = this.usersService.getList()

        res.json(UserResponseDto.fromEntries(users))
    }
    getUser = (req, res) => {
        const user = this.usersService.get(+req.params.id)

        res.json(UserWithHobbiesLinkResponseDto.from(user, new Links(req, { hobbies: `${PROCESS_ENV.API_BASE_URL}${this.baseRoute}/${user.id}/hobbies` })))
    }
    create = (req, res) => {
        const createUserDto = new CreateUserDto(req.body)

        const createdUser = this.usersService.create(createUserDto)

        res.status(201).json(UserResponseDto.from(createdUser))
    }
    patch = (req, res) => {
        const updateUserDto = new UpdateUserDto(req.body)

        const updatedUser = this.usersService.partiallyUpdate(+req.params.id, updateUserDto)

        res.json(UserResponseDto.from(updatedUser))
    }
    delete = (req, res) => {
        this.usersService.delete(+req.params.id)

        res.status(204).send('Deleted')
    }
    getUserHobbies = (req, res) => {
        const hobbies = this.usersService.getUserHobbies(+req.params.id)

        res.cache({ maxAge: 5 }).json(hobbies)
    }
    addHobby = (req, res) => {
        const { id, name: hobbyName } = req.params

        this.usersService.addHobby(+id, hobbyName)

        res.status(201).send(`Hobby with name: ${hobbyName} was successfully added to User (${id})`)
    }
    deleteHobby = (req, res) => {
        const { id, name: hobbyName } = req.params

        this.usersService.deleteHobby(+id, hobbyName)

        res.send(`Hobby with name: ${hobbyName} was successfully deleted from User (${id})`)
    }
}