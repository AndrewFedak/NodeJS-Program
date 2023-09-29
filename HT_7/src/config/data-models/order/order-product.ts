import { v4 } from 'uuid'
import {
  Entity,
  Unique,
  PrimaryKey,
  Property,
  ManyToOne,
} from '@mikro-orm/core'

import { Order } from '@src/orders/orders.entity'
import { CartItem } from '@src/carts/cart-item'

import { ProductDataModel } from '@config/data-models/product'
import { OrderDataModel } from './order'

@Entity()
@Unique({ properties: ['order', 'productId'] })
export class OrderProductDataModel {
  @PrimaryKey()
  id: string = v4()

  @ManyToOne({
    entity: () => OrderDataModel,
  })
  order!: OrderDataModel

  @Property()
  productId: string

  @Property()
  title: string

  @Property()
  description: string

  @Property()
  price: number

  @Property()
  count: number

  constructor(
    productId: string,
    title: string,
    description: string,
    price: number,
    count: number,
  ) {
    this.productId = productId
    this.title = title
    this.description = description
    this.price = price
    this.count = count
  }

  static toDomain(items: OrderProductDataModel[]): CartItem[] {
    return items.map(
      ({ count, ...product }) =>
        new CartItem(ProductDataModel.toDomain(product), count),
    )
  }

  static fromDomain(order: Order): OrderProductDataModel[] {
    return order.items.map(({ count, product }) => {
      const {
        id: productId,
        title,
        description,
        price,
      } = ProductDataModel.fromDomain(product)
      return new OrderProductDataModel(
        productId,
        title,
        description,
        price,
        count,
      )
    })
  }
}
