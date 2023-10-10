import { CartItem } from "../carts/cart-item";
import { Delivery } from "./delivery";
import { Payment } from "./payment";

type ORDER_STATUS = 'created' | 'completed';

export class Order {
    constructor(
        public id: string,
        public cartId: string,
        public userId: string,
        // Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed.
        public items: CartItem[],
        public total: number,
        //
        public payment: Payment,
        public delivery: Delivery,
        public status: ORDER_STATUS,
        public comments?: string,
    ) {}
}