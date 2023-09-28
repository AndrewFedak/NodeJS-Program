import { Entity, Loaded, PrimaryKey, OneToMany, Property } from "@mikro-orm/core";

import { Product } from "@src/products/products.entity";

import { CartProductDataModel } from "./cart/cart-product";

@Entity()
export class ProductDataModel {
    @PrimaryKey()
    id: string;

    @Property()
    title: string;

    @Property()
    description: string;

    @Property()
    price: number;

    @OneToMany({
        entity: () => CartProductDataModel,
        mappedBy: (cartProduct) => cartProduct.product,
    })
    cartProduct?: CartProductDataModel

    constructor(id: string, title: string, description: string, price: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price
    }

    static toDomain(userDataModel: Loaded<ProductDataModel>): Product {
        return new Product(userDataModel.id, userDataModel.title, userDataModel.description, userDataModel.price)
    }

    static fromDomain(userDomainModel: Product): ProductDataModel {
        return new ProductDataModel(userDomainModel.id, userDomainModel.title, userDomainModel.description, userDomainModel.price);
    }
}