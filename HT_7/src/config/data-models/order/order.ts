import { Entity, Loaded, PrimaryKey, OneToMany, Collection, Property, Enum } from "@mikro-orm/core";

import { Order, ORDER_STATUS } from "@src/orders/orders.entity";

import { OrderProductDataModel } from "./order-product";

@Entity()
export class OrderDataModel {
    @PrimaryKey()
    id: string;

    @Property()
    cartId: string

    @Property()
    userId: string
    
    // Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. 
    // For example, if user creates an order and after that price is changed, the order price shouldn't be changed.
    @OneToMany({
        entity: () => OrderProductDataModel,
        mappedBy: (orderProduct) => orderProduct.orderId
    })
    items = new Collection<OrderProductDataModel>(this)

    @Property()
    total: number

    // @Property()
    // payment: Payment
    // @Property()
    // delivery: Delivery

    @Enum({ items: ['created', 'completed'] })
    status: ORDER_STATUS

    @Property()
    comments?: string

    constructor(id: string, cartId: string, userId: string, items: OrderProductDataModel[], total: number, status: ORDER_STATUS, comments?: string) {
        this.id = id;
        this.cartId = cartId;
        this.userId = userId;
        this.items = new Collection<OrderProductDataModel>(this, items);
        this.total = total;
        this.status = status;
        this.comments = comments;
    }

    static toDomain({ id, cartId, userId, items, total, status, comments }: Loaded<OrderDataModel>): Order {
        return new Order(id, cartId, userId, OrderProductDataModel.toDomain(items.getItems()), total, {} as Order['payment'], {} as Order['delivery'], status, comments)
    }

    static fromDomain({id: orderId, userId, cartId, items, total, status, comments}: Order): OrderDataModel {
        return new OrderDataModel(orderId, cartId, userId, OrderProductDataModel.fromDomain(orderId, items), total, status, comments);
    }
}