import { v4 as uuid } from 'uuid';

import { IDatabase } from "./idatabase";

import { Cart } from "../carts/carts.entity";
import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";

const product1 = new Product('3', 'Product 1', 'Product 1 Description', 50)
const product2 = new Product('4', 'Product 2', 'Product 2 Description', 28)

const user1 = new User('1')
const cart1 = new Cart('5', user1.id, false, [{count: 1, product: product1}])
const order1 = new Order('6', cart1.id, user1.id, cart1.getItems(), cart1.getTotal(), {type: 'cash'}, {type: 'self-pickup', address: 'St. Some street'}, 'created')

const user2 = new User('2')

console.log('Here is a user that may be used for testing as already present cart: ', user1)
console.log('Here is a user that may be used for testing to create cart: ', user2)

export const InMemoryDB: IDatabase = {
    users: [user1, user2],
    products: [product1, product2],
    carts: [cart1],
    orders: [order1],
}