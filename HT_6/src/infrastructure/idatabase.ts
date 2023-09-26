import { Cart } from "../carts/carts.entity";
import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";

export interface IDatabase {
    users: User[],
    products: Product[],
    carts: Cart[],
    orders: Order[],
}