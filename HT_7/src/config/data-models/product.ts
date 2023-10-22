import { Entity, Loaded, PrimaryKey, Property } from '@mikro-orm/core'

import { Product } from '@src/products/products.entity'

@Entity()
export class ProductDataModel {
  @PrimaryKey()
  id: string

  @Property()
  title: string

  @Property()
  description: string

  @Property()
  price: number

  constructor(id: string, title: string, description: string, price: number) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
  }

  static toDomain({
    id,
    title,
    description,
    price,
  }: Loaded<ProductDataModel>): Product {
    return new Product(id, title, description, price)
  }

  static fromDomain({
    id,
    title,
    description,
    price,
  }: Product): ProductDataModel {
    return new ProductDataModel(id, title, description, price)
  }
}
