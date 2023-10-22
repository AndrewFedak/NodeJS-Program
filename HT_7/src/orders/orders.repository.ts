import { EntityManager } from '@mikro-orm/core'
import { SqlEntityRepository } from '@mikro-orm/postgresql'

import { OrderDataModel } from '@src/config/data-models/order/order'
import { OrderDeliveryDataModel } from '@src/config/data-models/order/order-delivery'
import { OrderPaymentDataModel } from '@src/config/data-models/order/order-payment'
import { OrderProductDataModel } from '@src/config/data-models/order/order-product'

import { Order } from './orders.entity'

export type IOrdersRepository = {
  create(order: Order): Promise<void>
}

export class OrdersRepository implements IOrdersRepository {
  private _ormOrdersRepository: SqlEntityRepository<OrderDataModel>
  private _ormOrdersProductRepository: SqlEntityRepository<OrderProductDataModel>
  private _ormOrdersDeliveryRepository: SqlEntityRepository<OrderDeliveryDataModel>
  private _ormOrdersPaymentRepository: SqlEntityRepository<OrderPaymentDataModel>

  constructor(_em: EntityManager) {
    this._ormOrdersRepository = _em.getRepository(OrderDataModel)
    this._ormOrdersProductRepository = _em.getRepository(OrderProductDataModel)
    this._ormOrdersDeliveryRepository = _em.getRepository(
      OrderDeliveryDataModel,
    )
    this._ormOrdersPaymentRepository = _em.getRepository(OrderPaymentDataModel)
  }

  async create(order: Order): Promise<void> {
    const orderDataModel = OrderDataModel.fromDomain(order)
    await this._ormOrdersDeliveryRepository.upsert(orderDataModel.delivery)
    await this._ormOrdersPaymentRepository.upsert(orderDataModel.payment)
    await this._ormOrdersRepository.upsert(orderDataModel)
    await this._ormOrdersProductRepository.upsertMany(
      orderDataModel.items.getItems(),
    )
  }
}
