import { OrderDataModel } from '@src/config/data-models/order'

import { Order } from './orders.entity'

export interface IOrdersRepository {
  create(order: Order): Promise<void>
}

export class OrdersRepository implements IOrdersRepository {
  async create(order: Order): Promise<void> {
    const orderDataModel = OrderDataModel.fromDomain(order)

    await OrderDataModel.create(orderDataModel)
  }
}
