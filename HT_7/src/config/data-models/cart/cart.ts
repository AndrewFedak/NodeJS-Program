import { Entity, Loaded, ManyToOne, OneToMany, PrimaryKey, Collection, Property } from "@mikro-orm/core";

import { Cart } from "@src/carts/carts.entity";

import { UserDataModel } from "@config/data-models/user";

import { CartProductDataModel } from "./cart-product";

@Entity()
export class CartDataModel {
    @PrimaryKey()
    id: string;

    @ManyToOne({
        entity: () => UserDataModel,
        name: 'user_id'
    })
    userId: string;

    @Property()
    isDeleted: boolean;

    @OneToMany({
        entity: () => CartProductDataModel,
        mappedBy: ({ cartId }) => cartId,
    })
    items = new Collection<CartProductDataModel>(this)

    constructor(id: string, userId: string, isDeleted: boolean, items: CartProductDataModel[]) {
        this.id = id;
        this.userId = userId
        this.isDeleted = isDeleted;
        this.items = new Collection<CartProductDataModel>(this, items);
    }

    static toDomain({ id, userId, isDeleted, items }: Loaded<CartDataModel>): Cart {
        return new Cart(id, userId, isDeleted, CartProductDataModel.toDomain(items.getItems()))
    }

    static fromDomain(cart: Cart): CartDataModel {
        const { id, userId, isDeleted, items } = cart
        return new CartDataModel(id, userId, isDeleted, CartProductDataModel.fromDomain(cart, items));
    }
}