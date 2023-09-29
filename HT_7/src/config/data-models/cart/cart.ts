import {
  Entity,
  Loaded,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Collection,
  Property,
} from '@mikro-orm/core'

import { Cart } from '@src/carts/carts.entity'

import { UserDataModel } from '@config/data-models/user'

import { CartProductDataModel } from './cart-product'

@Entity()
export class CartDataModel {
  @PrimaryKey()
  id: string

  // To not load WHOLE User entity, hack with adding @Property just for userId will work
  // to write record without passing unnessesary COMPLETE user
  @Property()
  userId: string
  @ManyToOne({
    entity: () => UserDataModel,
    joinColumn: 'user_id',
  })
  user!: UserDataModel
  //

  @Property()
  isDeleted: boolean

  @OneToMany({
    entity: () => CartProductDataModel,
    mappedBy: cp => cp.cart,
    eager: true,
  })
  items = new Collection<CartProductDataModel>(this)

  constructor(id: string, userId: string, isDeleted: boolean) {
    this.id = id
    this.userId = userId
    this.isDeleted = isDeleted
  }

  static toDomain({ id, user, isDeleted, items }: Loaded<CartDataModel>): Cart {
    return new Cart(
      id,
      user.id,
      isDeleted,
      CartProductDataModel.toDomain(items.getItems()),
    )
  }

  static fromDomain(cart: Cart): CartDataModel {
    const { id, userId, isDeleted } = cart
    const cartModel = new CartDataModel(id, userId, isDeleted)
    cartModel.items.add(CartProductDataModel.fromDomain(cart))
    return cartModel
  }
}
