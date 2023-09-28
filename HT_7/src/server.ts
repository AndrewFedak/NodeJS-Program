import * as  dotenv from 'dotenv';
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { ExceptionFilter } from './infrastructure/exceptions/exception-filter';
import { AuthenticationMiddleware } from './infrastructure/middlewares/authentication';

import { UsersRepository } from './users/users.repository';

import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { CartsRepository } from './carts/carts.repository';

import { ProductsController } from './products/products.controller';
import { ProductsRepository } from './products/products.repository';
import { ProductsService } from './products/products.service';

import { OrdersRepository } from './orders/orders.repository';

import config from './config/orm.config';
import FillDB from './config/fill-db';

dotenv.config();

async function bootstrap() {
  const orm = await MikroORM.init<PostgreSqlDriver>(config)
  console.log('Bootstrap initizalied app')

  const usersRepository = new UsersRepository(orm.em)
  const ordersRepository = new OrdersRepository(orm.em)
  const productsRepository = new ProductsRepository(orm.em)
  const cartsRepository = new CartsRepository(orm.em)

  const productsService = new ProductsService(productsRepository)
  const cartsService = new CartsService(cartsRepository, ordersRepository)
  const app: Express = express()

  app.use(bodyParser.json())
  app.use((req, res, next) => RequestContext.create(orm.em, next));
  app.get('/init', FillDB(orm.em))
  app.use(AuthenticationMiddleware.init(usersRepository))

  const router = express.Router()
  CartsController.init(cartsService, router)
  ProductsController.init(productsService, router)

  app.get('/', (req, res) => res.send(200))
  app.use('/api', router)
  app.use(ExceptionFilter)
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}
bootstrap()