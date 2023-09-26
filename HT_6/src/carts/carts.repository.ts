import { IDatabase } from "../infrastructure/idatabase";
import { Cart } from "./carts.entity";

export interface ICartsRepository {
    createCart(cart: Cart): Promise<void>
    getNonDeletedCartByUserId(userId: string): Promise<Cart | undefined>
}

export class CartsRepository implements ICartsRepository {
    constructor(
        private _db: IDatabase
    ) {}
    
    async createCart(cart: Cart) {
        this._db.carts.push(cart)
    }

    async getNonDeletedCartByUserId(userId: string) {
        return this._db.carts.find(cart => cart.userId === userId && cart.isDeleted === false)
    }
}