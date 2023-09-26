import { v4 as uuid } from 'uuid';

import { IDatabase } from "./idatabase";

import { Cart } from "../carts/carts.entity";
import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";

const user1 = new User(uuid())
const user2 = new User(uuid())

const product1 = new Product(uuid(), 'Product 1', 'Product 1 Description', 50)
const product2 = new Product(uuid(), 'Product 2', 'Product 2 Description', 28)

const cart1 = new Cart(uuid(), user1.id, false, [{count: 1, product: product1}])
const cart2 = new Cart(uuid(), user2.id, false, [{count: 3, product: product2}])

const order1 = new Order(uuid(), cart1.id, user1.id, cart1.getItems(), cart1.getTotal(), {type: 'cash'}, {type: 'self-pickup', address: 'St. Some street'}, 'created')

export const InMemoryDB: IDatabase = {
    users: [user1, user2],
    products: [product1, product2],
    carts: [cart1, cart2],
    orders: [order1],
}