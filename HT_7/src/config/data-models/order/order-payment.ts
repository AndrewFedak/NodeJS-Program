import { Loaded, PrimaryKey, Property, OneToOne, Entity } from '@mikro-orm/core'

import { Payment } from '@src/orders/payment'

import { OrderDataModel } from './order'

@Entity()
export class OrderPaymentDataModel {
  @PrimaryKey()
  id: string

  @OneToOne({
    entity: () => OrderDataModel,
    mappedBy: (order) => order.payment,   // On the inversed (that) side we define it with mappedBy attribute pointing back to the owner
    orphanRemoval: true,
  })
  order!: OrderDataModel

  @Property()
  type: string

  @Property({
    nullable: true,
  })
  address?: string

  @Property({
    nullable: true,
  })
  creditCard?: string

  constructor(id: string, type: string, address?: string, creditCard?: string) {
    this.id = id
    this.type = type
    this.address = address
    this.creditCard = creditCard
  }

  static toDomain({
    id,
    type,
    address,
    creditCard
  }: Loaded<OrderPaymentDataModel>): Payment {
    return new Payment(id, type, address, creditCard)
  }

  static fromDomain({
    id,
    type,
    address,
    creditCard,
  }: Payment): OrderPaymentDataModel {
    return new OrderPaymentDataModel(id, type, address, creditCard)
  }
}
