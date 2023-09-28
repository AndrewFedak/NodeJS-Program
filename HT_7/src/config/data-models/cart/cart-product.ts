import { v4 } from "uuid";
import { Entity, PrimaryKey, ManyToOne, Unique, Property } from "@mikro-orm/core";

import { CartItem } from "@src/carts/cart-item";
import { Cart } from "@src/carts/carts.entity";

import { ProductDataModel } from "@config/data-models/product";

import { CartDataModel } from "./cart";

@Entity()
@Unique({ properties: ['cartId', 'product'] })
export class CartProductDataModel {
    @PrimaryKey()
    id: string = v4();

    @ManyToOne({
        entity: () => CartDataModel,
        name: 'cart_id',
    })
    cartId: string;

    @ManyToOne({
        entity: () => ProductDataModel,
        name: 'product_id',
    })
    product: ProductDataModel;

    @Property()
    count: number;

    constructor(
        cartId: string,
        product: ProductDataModel,
        count: number
    ) {
        this.cartId = cartId
        this.product = product
        this.count = count
    }

    static toDomain(items: CartProductDataModel[]): CartItem[] {
        return items.map(({ product, count }) => new CartItem(ProductDataModel.toDomain(product), count))
    }

    static fromDomain(cart: Cart, items: CartItem[]): CartProductDataModel[] {
        return items.map(({ count, product }) => new CartProductDataModel(cart.id, ProductDataModel.fromDomain(product), count))
    }
}