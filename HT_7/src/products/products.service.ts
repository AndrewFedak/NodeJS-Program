import { v4 as uuid } from 'uuid'

import { NotFoundException } from '../infrastructure/exceptions/not-found.exception';

import { IProductsRepository } from './products.repository';
import { Product } from './products.entity';

export class ProductsService {
    constructor(
        private _cardsRepository: IProductsRepository,
    ) { }

    async getListOfProducts(): Promise<Product[]> {
        return this._cardsRepository.getListOfProducts()
    }

    async getSingleProduct(productId: string): Promise<Product> {
        const product = await this._cardsRepository.getProductById(productId);
        if (!product) {
            throw new NotFoundException('No product with such id')
        }
        return product
    }
}