import { IInMemoryDatabase } from "../infrastructure/in-memory.database";

import { Cart } from "./carts.entity";

export interface ICartsRepository {
    createCart(cart: Cart): Promise<void>
    getCartByCartId(cartId: string): Promise<Cart | undefined>
    getCartByUserId(userId: string): Promise<Cart | undefined>
    updateCart(updatedCart: Cart): Promise<void>
}

export class CartsRepository implements ICartsRepository {
    constructor(
        private _db: IInMemoryDatabase
    ) {}
    async createCart(cart: Cart) {
        this._db.carts.push(cart)
    }
    async getCartByCartId(cartId: string) {
        return this._db.carts.find(cart => cart.id === cartId)
    }
    async getCartByUserId(userId: string) {
        return this._db.carts.find(cart => cart.userId === userId && cart.isDeleted === false)
    }
    async updateCart(updatedCart: Cart): Promise<void> {
        this._db.carts = [
            ...this._db.carts.filter(cart => cart.id !== updatedCart.id),
            updatedCart
        ]
    }
}