import { v4 } from 'uuid';
import { Entity, Unique, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";

import { CartItem } from "@src/carts/cart-item";

import { ProductDataModel } from "@config/data-models/product";
import { OrderDataModel } from './order';

@Entity()
@Unique({ properties: ['orderId', 'productId'] })
export class OrderProductDataModel {
    @PrimaryKey()
    id: string = v4()

    @ManyToOne({
        entity: () => OrderDataModel,
    })
    orderId: string

    @Property()
    productId: string

    @Property()
    title: string;

    @Property()
    description: string;

    @Property()
    price: number;

    @Property()
    count: number;

    constructor(orderId: string, productId: string, title: string, description: string, price: number, count: number) {
        this.orderId = orderId;
        this.productId = productId;
        this.title = title;
        this.description = description;
        this.price = price
        this.count = count
    }

    static toDomain(items: OrderProductDataModel[]): CartItem[] {
        return items.map(({ count, ...product }) => new CartItem(ProductDataModel.toDomain(product), count))
    }

    static fromDomain(orderId: string, items: CartItem[]): OrderProductDataModel[] {
        return items.map(({ count, product: domainProduct }) => {
            const product = ProductDataModel.fromDomain(domainProduct)
            return new OrderProductDataModel(orderId, product.id, product.title, product.description, product.price, count)
        })
    }
}