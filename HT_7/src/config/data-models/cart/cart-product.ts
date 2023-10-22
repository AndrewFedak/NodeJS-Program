import { v4 } from 'uuid'
import {
  Entity,
  PrimaryKey,
  ManyToOne,
  Unique,
  Property,
} from '@mikro-orm/core'

import { CartItem } from '@src/carts/cart-item'
import { Cart } from '@src/carts/carts.entity'

import { ProductDataModel } from '@config/data-models/product'

import { CartDataModel } from './cart'

// Referenced Entity is not fully loaded by default. Just PrimaryKey for reference is.

// @Entity()
// export class Book {

//   @PrimaryKey()
//   id!: number;

// To load it, we may use eager: true, to let ORM know to load Entity fully on-request (https://mikro-orm.io/docs/type-safe-relations)
// Otherwise, we may load it whenever we want by, i.e of previous (await book1.author.load())
// Without eager:             With eager:
//   "author" {                 "author": {
//      id: "3"                    "id": "3",
//    }                            "name": "Product 1",
//                                 "age": "Product 1 Description",
//                               }
//   @ManyToOne()               @ManyToOne({eager: true})
//   author!: Author;           author!: Author;
// }

// const book = await em.findOne(Book, 1);
// console.log(book.author instanceof Author); // true
// console.log(wrap(book.author).isInitialized()); // false
// console.log(book.author.name); // undefined as `Author` is not loaded yet

@Entity()
@Unique({ properties: ['cart', 'product'] })
export class CartProductDataModel {
  @PrimaryKey()
  id: string = v4()

  @ManyToOne({
    entity: () => CartDataModel,
  })
  cart!: CartDataModel

  @ManyToOne({
    entity: () => ProductDataModel,
    eager: true,
  })
  product!: ProductDataModel

  @Property()
  count: number

  constructor(product: ProductDataModel, count: number) {
    this.product = product
    this.count = count
  }

  static toDomain(items: CartProductDataModel[]): CartItem[] {
    return items.map(
      ({ product, count }) =>
        new CartItem(ProductDataModel.toDomain(product), count),
    )
  }

  static fromDomain(cart: Cart): CartProductDataModel[] {
    return cart.items.map(
      ({ count, product }) =>
        new CartProductDataModel(ProductDataModel.fromDomain(product), count),
    )
  }
}
