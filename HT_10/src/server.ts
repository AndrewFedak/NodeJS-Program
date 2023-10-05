import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import * as database from './config/db'
import FillDB from './config/fill-db'

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

import { AuthenticationController } from './authentication/authentication.controller'
import { AuthenticationRepository } from './authentication/authentication.repository'
import { AuthenticationService } from './authentication/authentication.service'

export async function bootstrap() {
  dotenv.config()

  const mongoose = await database.connect()

  const usersRepository = new UsersRepository()
  const productsRepository = new ProductsRepository()
  const cartsRepository = new CartsRepository()
  const ordersRepository = new OrdersRepository()

  const authenticationRepository = new AuthenticationRepository()
  const authenticationService = new AuthenticationService(
    usersRepository,
    authenticationRepository,
  )

  const productsService = new ProductsService(productsRepository)
  const cartsService = new CartsService(cartsRepository, ordersRepository)

  const app = express()

  app.use(bodyParser.json())
  app.get('/init', FillDB)

  app.get('/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  })

  app.use(
    '/api',
    AuthenticationController.init(authenticationService),
    AuthenticationMiddleware.authenticate,
    CartsController.init(cartsService),
    ProductsController.init(productsService),
  )

  app.use(ExceptionFilter)

  return app
}
