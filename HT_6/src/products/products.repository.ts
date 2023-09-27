import { IInMemoryDatabase } from "../infrastructure/in-memory.database";

import { Product } from "./products.entity";

export interface IProductsRepository {
    getListOfProducts(): Promise<Product[]>
    getProductById(productId: string): Promise<Product | undefined>
}

export class ProductsRepository implements IProductsRepository {
    constructor(
        private _db: IInMemoryDatabase
    ) { }
    async getListOfProducts(): Promise<Product[]> {
        return this._db.products
    }
    async getProductById(productId: string): Promise<Product | undefined> {
        return this._db.products.find(product => product.id === productId);
    }
}