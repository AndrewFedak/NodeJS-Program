const { HttpServer } = require('./custom-http-wrapper')

const { UsersController } = require('./users/users.controller')
const { UsersService } = require('./users/users.service')
const { UsersRepository } = require('./users/users.repository')


function bootstrap() {
    const PORT = 3000
    const app = new HttpServer()

    const localDB = require('./db/index')

    const usersRepository = new UsersRepository(localDB)
    const usersService = new UsersService(usersRepository)
    const usersController = new UsersController(usersService)
    
    usersController.init(app)
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
bootstrap()
