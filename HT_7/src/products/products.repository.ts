import { EntityManager } from '@mikro-orm/core'
import { SqlEntityRepository } from '@mikro-orm/postgresql'

import { ProductDataModel } from '../config/data-models/product'

import { Product } from './products.entity'

export type IProductsRepository = {
  getListOfProducts(): Promise<Product[]>
  getProductById(productId: string): Promise<Product | null>
}

export class ProductsRepository implements IProductsRepository {
  private _ormProductsRepository: SqlEntityRepository<ProductDataModel>
  constructor(_em: EntityManager) {
    this._ormProductsRepository = _em.getRepository(ProductDataModel)
  }
  async getListOfProducts(): Promise<Product[]> {
    const products = await this._ormProductsRepository.findAll()
    return products.map(ProductDataModel.toDomain)
  }
  async getProductById(productId: string): Promise<Product | null> {
    const product = await this._ormProductsRepository.findOne({
      id: productId,
    })
    if (!product) {
      return null
    }
    return ProductDataModel.toDomain(product)
  }
}
