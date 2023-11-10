import { model, Schema } from 'mongoose'

import { Order as OrderDomain, ORDER_STATUS } from '@src/orders/orders.entity'
import { Payment } from '@src/orders/payment'
import { Delivery } from '@src/orders/delivery'

import { IProduct, ProductDataModel, productSchema } from './product'

interface IOrder {
  _id: string
  cartId: string
  userId: string
  total: number
  status: ORDER_STATUS
  payment: {
    _id: string
    type: string
    address?: string
    creditCart?: string
  }
  delivery: {
    _id: string
    type: string
    address: string
  }
  comments?: string
  items: {
    product: IProduct
    count: number
  }[]
}

const orderSchema = new Schema<IOrder>({
  _id: { type: 'String' },
  cartId: { type: 'String' },
  userId: { type: 'String' },
  total: { type: 'Number' },
  status: { type: 'String', enum: ['created', 'completed'] },
  payment: {
    _id: { type: 'String' },
    type: { type: 'String' },
    address: { type: 'String', required: false },
    creditCart: { type: 'String', required: false },
  },
  delivery: {
    _id: { type: 'String' },
    type: { type: 'String' },
    address: { type: 'String' },
  },
  items: [
    {
      product: productSchema,
      count: { type: 'Number' },
    },
  ],
  comments: { type: { type: 'String', required: false } },
})
const Order = model<IOrder>('Order', orderSchema)

export class OrderDataModel extends Order {
  constructor(data?: IOrder) {
    super(data)
  }

  static toDomain({
    _id,
    cartId,
    userId,
    items,
    total,
    status,
    payment,
    delivery,
    comments,
  }: IOrder): OrderDomain {
    return new OrderDomain(
      _id,
      cartId,
      userId,
      items.map(item => ({
        product: ProductDataModel.toDomain(item.product),
        count: item.count,
      })),
      total,
      new Payment(
        payment._id,
        payment.type,
        payment.address,
        payment.creditCart,
      ),
      new Delivery(delivery._id, delivery.type, delivery.address),
      status,
      comments,
    )
  }

  static fromDomain(order: OrderDomain): IOrder {
    const {
      id: orderId,
      userId,
      cartId,
      total,
      status,
      payment,
      delivery,
      items,
      comments,
    } = order

    const orderDataModel = new Order<IOrder>({
      _id: orderId,
      cartId,
      userId,
      total,
      status,
      payment: {
        _id: payment.id,
        type: payment.type,
        address: payment.address,
        creditCart: payment.creditCard,
      },
      delivery: {
        _id: delivery.id,
        type: delivery.type,
        address: delivery.address,
      },
      comments,
      items: items.map(item => ({
        product: ProductDataModel.fromDomain(item.product),
        count: item.count,
      })),
    })
    return orderDataModel
  }
}
