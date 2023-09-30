import { Schema, model } from 'mongoose'

import { Product as ProductDomain } from '@src/products/products.entity'

export interface IProduct {
  _id: string
  title: string
  description: string
  price: number
}
export const productSchema = new Schema<IProduct>({
  _id: { type: 'String' },
  title: { type: 'String' },
  description: { type: 'String' },
  price: { type: 'Number' },
})
const Product = model<IProduct>('Product', productSchema)

export class ProductDataModel extends Product {
  constructor(data: IProduct) {
    super(data)
  }

  static toDomain({ _id, title, description, price }: IProduct): ProductDomain {
    return new ProductDomain(_id, title, description, price)
  }

  static fromDomain({
    id,
    title,
    description,
    price,
  }: ProductDomain): IProduct {
    return new Product<IProduct>({ _id: id, title, description, price })
  }
}
