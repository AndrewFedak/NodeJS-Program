import { CartDataModel } from '@src/config/data-models/cart'

import { Cart } from './carts.entity'

export interface ICartsRepository {
  createCart(cart: Cart): Promise<Cart>
  getCartByCartId(cartId: string): Promise<Cart | null>
  getCartByUserId(userId: string): Promise<Cart | null>
  updateCartItems(updatedCart: Cart): Promise<void>
}

export class CartsRepository implements ICartsRepository {
  async createCart(cart: Cart) {
    const newCartData = await CartDataModel.create(
      CartDataModel.fromDomain(cart),
    )
    return CartDataModel.toDomain(newCartData)
  }

  async getCartByCartId(cartId: string) {
    const cartModel = await CartDataModel.findOne({
      _id: cartId,
      isDeleted: false,
    })
    if (!cartModel) {
      return null
    }
    return CartDataModel.toDomain(cartModel)
  }

  async getCartByUserId(userId: string) {
    const cartModel = await CartDataModel.findOne({
      userId,
      isDeleted: false,
    })
    if (!cartModel) {
      return null
    }
    return CartDataModel.toDomain(cartModel)
  }

  async updateCartItems(cart: Cart): Promise<void> {
    const cartDataModel = CartDataModel.fromDomain(cart)
    await CartDataModel.updateOne(
      {
        _id: cartDataModel._id,
      },
      {
        $set: {
          items: cartDataModel.items,
        },
      },
    )
  }
}
