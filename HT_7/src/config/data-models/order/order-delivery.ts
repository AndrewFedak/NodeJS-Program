import { Entity, Loaded, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'

import { Delivery } from '@src/orders/delivery'

import { OrderDataModel } from './order'

@Entity()
export class OrderDeliveryDataModel {
  @PrimaryKey()
  id: string

  @OneToOne({
    entity: () => OrderDataModel,
    mappedBy: (order) => order.delivery,
    orphanRemoval: true,
  })
  order!: OrderDataModel

  @Property()
  type: string

  @Property()
  address: string

  constructor(id: string, type: string, address: string) {
    this.id = id
    this.type = type
    this.address = address
  }

  static toDomain({ id, type, address }: Loaded<OrderDeliveryDataModel>): Delivery {
    return new Delivery(id, type, address)
  }

  static fromDomain({ id, type, address }: Delivery): OrderDeliveryDataModel {
    return new OrderDeliveryDataModel(id, type, address)
  }
}
