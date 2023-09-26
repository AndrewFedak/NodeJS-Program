"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const in_memory_database_1 = require("./infrastructure/in-memory.database");
const exception_filter_1 = require("./infrastructure/exceptions/exception-filter");
const authentication_1 = require("./infrastructure/middlewares/authentication");
const users_repository_1 = require("./users/users.repository");
const carts_controller_1 = require("./carts/carts.controller");
const carts_service_1 = require("./carts/carts.service");
const carts_repository_1 = require("./carts/carts.repository");
const products_controller_1 = require("./products/products.controller");
const products_repository_1 = require("./products/products.repository");
const products_service_1 = require("./products/products.service");
const orders_repository_1 = require("./orders/orders.repository");
dotenv_1.default.config();
function bootstrap() {
    const usersRepository = new users_repository_1.UsersRepository(in_memory_database_1.InMemoryDB);
    const ordersRepository = new orders_repository_1.OrdersRepository(in_memory_database_1.InMemoryDB);
    const productsRepository = new products_repository_1.ProductsRepository(in_memory_database_1.InMemoryDB);
    const cartsRepository = new carts_repository_1.CartsRepository(in_memory_database_1.InMemoryDB);
    const productsService = new products_service_1.ProductsService(productsRepository);
    const cartsService = new carts_service_1.CartsService(cartsRepository, ordersRepository);
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(authentication_1.AuthenticationMiddleware.init(usersRepository));
    const router = express_1.default.Router();
    carts_controller_1.CartsController.init(cartsService, router);
    products_controller_1.ProductsController.init(productsService, router);
    app.use('/api', router);
    app.use(exception_filter_1.ExceptionFilter);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}
bootstrap();
