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
  // *NOTE: didn't work for productId in CartProductDataModel for some reasons. To be discovered 😕
  @Property()
  userId: string
  @ManyToOne({
    entity: () => UserDataModel,
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

  // CartProductDataModel {
  //   id: '6b7caea5-d839-4f00-a455-101f4a28aa40',
  //   product: ProductDataModel {
  //     id: '3',
  //     title: 'Product 1',
  //     description: 'Product 1 Description',
  //     price: 50
  //   },
  //   count: 2,
  //   cart: CartDataModel {    (here 'mappedBy' property takes a use, when fetch CartProductDataModel, cp.cart property will be filled by Cart)
  //     items: Collection<CartProductDataModel> { '0': [CartProductDataModel], initialized: true, dirty: true },
  //     id: '6',
  //     userId: '1',
  //     isDeleted: false,
  //     user: UserDataModel { id: '1' }
  //   }
  // }

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
