import { ProductDataModel } from '../config/data-models/product'

import { Product } from './products.entity'

export interface IProductsRepository {
  getListOfProducts(): Promise<Product[]>
  getProductById(productId: string): Promise<Product | null>
}

export class ProductsRepository implements IProductsRepository {
  async getListOfProducts(): Promise<Product[]> {
    const products = await ProductDataModel.find()
    return products.map(ProductDataModel.toDomain)
  }
  async getProductById(productId: string): Promise<Product | null> {
    const product = await ProductDataModel.findById(productId)
    if (!product) {
      return null
    }
    return ProductDataModel.toDomain(product)
  }
}
