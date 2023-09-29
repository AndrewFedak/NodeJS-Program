import { v4 } from 'uuid'
import {
  Entity,
  PrimaryKey,
  ManyToOne,
  Unique,
  Property,
} from '@mikro-orm/core'

import { CartItem } from '@src/carts/cart-item'
import { Cart } from '@src/carts/carts.entity'

import { ProductDataModel } from '@config/data-models/product'

import { CartDataModel } from './cart'

@Entity()
@Unique({ properties: ['cart', 'product'] })
export class CartProductDataModel {
  @PrimaryKey()
  id: string = v4()

  @ManyToOne({
    entity: () => CartDataModel,
  })
  cart!: CartDataModel

  @ManyToOne({
    entity: () => ProductDataModel,
  })
  product!: ProductDataModel

  @Property()
  count: number

  constructor(product: ProductDataModel, count: number) {
    this.product = product
    this.count = count
  }

  static toDomain(items: CartProductDataModel[]): CartItem[] {
    return items.map(
      ({ product, count }) =>
        new CartItem(ProductDataModel.toDomain(product), count),
    )
  }

  static fromDomain(cart: Cart): CartProductDataModel[] {
    return cart.items.map(
      ({ count, product }) =>
        new CartProductDataModel(ProductDataModel.fromDomain(product), count),
    )
  }
}
