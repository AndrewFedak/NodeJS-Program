import {
  Entity,
  Loaded,
  PrimaryKey,
  OneToMany,
  Collection,
  Property,
  Enum,
  OneToOne,
} from '@mikro-orm/core'

import { Order, ORDER_STATUS } from '@src/orders/orders.entity'

import { OrderProductDataModel } from './order-product'
import { OrderPaymentDataModel } from './order-payment'
import { OrderDeliveryDataModel } from './order-delivery'

@Entity()
export class OrderDataModel {
  @PrimaryKey()
  id: string

  @Property()
  cartId: string

  @Property()
  userId: string

  @Property()
  total: number

  @Enum({ items: ['created', 'completed'] })
  status: ORDER_STATUS

  @OneToOne({
    entity: () => OrderPaymentDataModel,
    inversedBy: payment => payment.order,
  })
  payment: OrderPaymentDataModel

  @OneToOne({
    entity: () => OrderDeliveryDataModel,
    inversedBy: delivery => delivery.order, // one is owning side (where 'references are store'), (in current, delivery_id)  marked by inversedBy attribute pointing to the inverse side.
  })
  delivery: OrderDeliveryDataModel

  @Property({
    nullable: true,
  })
  comments?: string
  // Order entity has copy of products. If you have only product id in order, it may lead to inconsistency.
  // For example, if user creates an order and after that price is changed, the order price shouldn't be changed.
  @OneToMany({
    entity: () => OrderProductDataModel,
    mappedBy: orderProduct => orderProduct.order,
    eager: true,
  })
  items = new Collection<OrderProductDataModel>(this)

  constructor(
    id: string,
    cartId: string,
    userId: string,
    total: number,
    status: ORDER_STATUS,
    payment: OrderPaymentDataModel,
    delivery: OrderDeliveryDataModel,
    comments?: string,
  ) {
    this.id = id
    this.cartId = cartId
    this.userId = userId
    this.total = total
    this.status = status
    this.payment = payment
    this.delivery = delivery
    this.comments = comments
  }

  static toDomain({
    id,
    cartId,
    userId,
    items,
    total,
    status,
    payment,
    delivery,
    comments,
  }: Loaded<OrderDataModel>): Order {
    return new Order(
      id,
      cartId,
      userId,
      OrderProductDataModel.toDomain(items.getItems()),
      total,
      OrderPaymentDataModel.toDomain(payment),
      OrderDeliveryDataModel.toDomain(delivery),
      status,
      comments,
    )
  }

  static fromDomain(order: Order): OrderDataModel {
    const {
      id: orderId,
      userId,
      cartId,
      total,
      status,
      payment,
      delivery,
      comments,
    } = order
    const orderDataModel = new OrderDataModel(
      orderId,
      cartId,
      userId,
      total,
      status,
      OrderPaymentDataModel.fromDomain(payment),
      OrderDeliveryDataModel.fromDomain(delivery),
      comments,
    )
    orderDataModel.items.add(OrderProductDataModel.fromDomain(order))
    return orderDataModel
  }
}
