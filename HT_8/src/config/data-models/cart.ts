import { Schema, model } from 'mongoose'

import { Cart as CartDomain } from '@src/carts/carts.entity'

import { IProduct, ProductDataModel, productSchema } from './product'

// The field name _id is reserved for use as a primary key; 
// its value must be unique in the collection, is immutable, and may be of any type other than an array.
interface ICart {
  _id: string
  userId: string
  isDeleted: boolean
  items: {
    product: IProduct
    count: number
  }[]
}

const cartSchema = new Schema<ICart>({
  _id: { type: 'String' },
  userId: { type: 'String' },
  isDeleted: { type: 'Boolean' },
  items: [
    {
      product: productSchema,
      count: { type: 'Number' },
    },
  ],
})
const Cart = model<ICart>('Cart', cartSchema)

export class CartDataModel extends Cart {
  constructor(data: ICart) {
    super(data)
  }

  static toDomain({ _id, userId, isDeleted, items }: ICart): CartDomain {
    return new CartDomain(
      _id,
      userId,
      isDeleted,
      items.map(item => ({
        product: ProductDataModel.toDomain(item.product),
        count: item.count,
      })),
    )
  }

  static fromDomain(cart: CartDomain): ICart {
    const { id, userId, isDeleted, items } = cart
    return new Cart<ICart>({
      _id: id,
      userId,
      isDeleted,
      items: items.map(item => ({
        product: ProductDataModel.fromDomain(item.product),
        count: item.count,
      })),
    })
  }
}
