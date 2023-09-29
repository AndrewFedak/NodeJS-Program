import { EntityManager } from '@mikro-orm/core'
import { SqlEntityRepository } from '@mikro-orm/postgresql'

import { CartDataModel } from '@config/data-models/cart/cart'
import { CartProductDataModel } from '@src/config/data-models/cart/cart-product'

import { Cart } from './carts.entity'

export type ICartsRepository = {
  createCart(cart: Cart): Promise<void>
  getCartByCartId(cartId: string): Promise<Cart | null>
  getCartByUserId(userId: string): Promise<Cart | null>
  updateCartItems(updatedCart: Cart): Promise<void>
}

export class CartsRepository implements ICartsRepository {
  private _ormCartsRepository: SqlEntityRepository<CartDataModel>
  private _ormCartsProductRepository: SqlEntityRepository<CartProductDataModel>

  constructor(_em: EntityManager) {
    this._ormCartsRepository = _em.getRepository(CartDataModel)
    this._ormCartsProductRepository = _em.getRepository(CartProductDataModel)
  }

  async createCart(cart: Cart) {
    const cartModel = CartDataModel.fromDomain(cart)
    await this._ormCartsRepository.upsert(cartModel)
    await this._ormCartsProductRepository.upsertMany(cartModel.items.getItems())
  }

  async getCartByCartId(cartId: string) {
    const cartModel = await this._ormCartsRepository.findOne({
      id: cartId,
      isDeleted: false,
    })
    if (!cartModel) {
      return null
    }
    return CartDataModel.toDomain(cartModel)
  }

  async getCartByUserId(userId: string) {
    const cartModel = await this._ormCartsRepository.findOne({
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
    await this._ormCartsProductRepository.nativeDelete({
      cart: cartDataModel,
    })
    await this._ormCartsProductRepository.upsertMany(
      cartDataModel.items.getItems(),
    )
  }
}
