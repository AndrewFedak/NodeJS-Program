import { v4 as uuid } from 'uuid'

import { BadRequestException } from '../infrastructure/exceptions/bad-request.exception';
import { NotFoundException } from '../infrastructure/exceptions/not-found.exception';

import { Cart } from "./carts.entity";
import { ICartsRepository } from "./carts.repository";
import { IOrdersRepository } from "../orders/orders.repository";

import { UpdateCartDto } from './dto/update-cart.dto';
import { Order } from '../orders/orders.entity';
import { IProductsRepository } from '../products/products.repository';

export class CartsService {
    constructor(
        private _productsRepository: IProductsRepository,
        private _cartsRepository: ICartsRepository,
        private _ordersRepository: IOrdersRepository
    ) { }

    async createNewCart(userId: string): Promise<Cart> {
        const cart = await this._cartsRepository.getCartByUserId(userId);
        if (!!cart) {
            throw new BadRequestException('Cannot create new cart while previous exist')
        }
        return this.createCart(userId)
    }

    async getOrCreateCart(userId: string): Promise<Cart> {
        const cart = await this._cartsRepository.getCartByUserId(userId);
        if (!!cart) {
            return cart
        }
        return this.createCart(userId)
    }

    private async createCart(userId: string): Promise<Cart> {
        const newCart = new Cart(uuid(), userId, false, [])
        await this._cartsRepository.createCart(newCart)
        return newCart
    }

    async updateCart(updateCartDto: UpdateCartDto, userId: string): Promise<Cart> {
        const cart = await this._cartsRepository.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found')
        };

        const product = await this._productsRepository.getProductById(updateCartDto.productId);
        if (product) {
            cart.updateItem({ product, count: updateCartDto.count })
        }

        await this._cartsRepository.updateCart(cart)

        return cart
    }

    async emptyCart(userId: string): Promise<void> {
        const cart = await this._cartsRepository.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart Not found')
        }

        cart.empty()

        await this._cartsRepository.updateCart(cart);
    }

    async checkout(userId: string): Promise<Order> {
        const cart = await this._cartsRepository.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart Not found')
        }
        const order = new Order(uuid(), cart.id, userId, cart.items, cart.getTotal(), { type: 'cash' }, { type: 'courier', address: 'smth' }, 'created')

        await this._ordersRepository.create(order);

        return order
    }
}