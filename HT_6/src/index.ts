import dotenv from 'dotenv';
import { app } from './app'

import { InMemoryDB } from './infrastructure/in-memory.database';

dotenv.config();

function bootstrap() {
  const userRepository = new UsersRepository(InMemoryDB) 
  const ordersRepository = new OrdersRepository(InMemoryDB) 
  const productsRepository = new ProductsRepository(InMemoryDB) 
  const cartsRepository = new CartsRepository(InMemoryDB) 

  const usersService = new UsersService(userRepository) 
  const ordersService = new OrdersService(ordersRepository) 
  const productsService = new ProductsService(productsRepository) 
  const cartsService = new CartsService(cartsRepository)

  app.use(UsersController.init(usersService))
  app.use(OrdersController.init(ordersService))
  app.use(ProductsController.init(productsService))
  app.use(CartsController.init(cartsService))

  const port = process.env.PORT;  
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}
bootstrap()