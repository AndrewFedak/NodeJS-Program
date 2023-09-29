import { HttpServer } from './http-server-abstraction.mjs'

import { UsersController } from './src/users/users.controller.mjs'
import { UsersService } from './src/users/users.service.mjs'
import { UsersRepository } from './src/users/users.repository.mjs'

import localDB from './db/index.mjs'

import { PROCESS_ENV } from './env.mjs'

function bootstrap() {
    const PORT = PROCESS_ENV.PORT
    const app = new HttpServer()

    const usersRepository = new UsersRepository(localDB)
    const usersService = new UsersService(usersRepository)
    const usersController = new UsersController(usersService)

    usersController.init(app)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
bootstrap()
