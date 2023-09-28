import { EntityManager } from "@mikro-orm/core";
import { SqlEntityRepository } from "@mikro-orm/postgresql";

import { CartDataModel } from "@config/data-models/cart/cart";

import { Cart } from "./carts.entity";

export interface ICartsRepository {
    createCart(cart: Cart): Promise<void>
    getCartByCartId(cartId: string): Promise<Cart | null>
    getCartByUserId(userId: string): Promise<Cart | null>
    updateCart(updatedCart: Cart): Promise<void>
}

export class CartsRepository implements ICartsRepository {
    private _ormCartsRepository: SqlEntityRepository<CartDataModel>
    constructor(
        _em: EntityManager
    ) {
        this._ormCartsRepository = _em.getRepository(CartDataModel)
    }
    async createCart(cart: Cart) {
        await this._ormCartsRepository.nativeInsert(CartDataModel.fromDomain(cart))
    }
    async getCartByCartId(cartId: string) {
        const cartModel = await this._ormCartsRepository.findOne({
            id: cartId,
            isDeleted: false,
        })
        if(!cartModel) {
            return null
        }
        return CartDataModel.toDomain(cartModel)
    }
    async getCartByUserId(userId: string) {
        const cartModel = await this._ormCartsRepository.findOne({
            userId: userId,
            isDeleted: false,
        })
        if(!cartModel) {
            return null
        }
        return CartDataModel.toDomain(cartModel)
    }
    async updateCart(updatedCart: Cart): Promise<void> {
        this._ormCartsRepository.upsert
    }
}