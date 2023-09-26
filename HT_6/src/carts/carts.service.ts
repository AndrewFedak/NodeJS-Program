import { v4 as uuid } from 'uuid'

import { Cart } from "./carts.entity";
import { ICartsRepository } from "./carts.repository";

export class CartsService {
    constructor(
        private _cardsRepository: ICartsRepository
    ) { }

    createCart(userId: string) {
        const cart = this._cardsRepository.getNonDeletedCartByUserId(userId);
        if (!!cart) {
            throw new Error('Cannot create new card while previous exist')
        }
        const newCart = new Cart(uuid(), userId, false, [])
        this._cardsRepository.createCart(newCart)
    }
}