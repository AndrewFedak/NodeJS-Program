import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import bodyParser from 'body-parser'

import { ExceptionFilter } from './infrastructure/exceptions/exception-filter'
import { AuthenticationMiddleware } from './infrastructure/middlewares/authentication'

import { UsersRepository } from './users/users.repository'

import { CartsController } from './carts/carts.controller'
import { CartsService } from './carts/carts.service'
import { CartsRepository } from './carts/carts.repository'

import { ProductsController } from './products/products.controller'
import { ProductsRepository } from './products/products.repository'
import { ProductsService } from './products/products.service'

import { OrdersRepository } from './orders/orders.repository'

import FillDB from './config/fill-db'

dotenv.config()

async function bootstrap() {
  await import('./config/db')

  const usersRepository = new UsersRepository()
  const productsRepository = new ProductsRepository()
  const cartsRepository = new CartsRepository()
  const ordersRepository = new OrdersRepository()

  const productsService = new ProductsService(productsRepository)
  const cartsService = new CartsService(cartsRepository, ordersRepository)
  const app: Express = express()

  app.use(bodyParser.json())
  app.get('/init', FillDB)
  app.use(AuthenticationMiddleware.init(usersRepository))

  const router = express.Router()
  CartsController.init(cartsService, router)
  ProductsController.init(productsService, router)

  app.use('/api', router)
  app.use(ExceptionFilter)

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}
bootstrap()
