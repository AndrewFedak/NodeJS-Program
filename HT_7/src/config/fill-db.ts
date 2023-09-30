import { RequestHandler } from 'express'
import { EntityManager } from '@mikro-orm/core'

import { UserDataModel } from './data-models/user'

import { ProductDataModel } from './data-models/product'

import { CartDataModel } from './data-models/cart/cart'
import { CartProductDataModel } from './data-models/cart/cart-product'

import { Cart } from '@src/carts/carts.entity'

import { Product } from '@src/products/products.entity'

import { User } from '@src/users/users.entity'

const FillDB = function (em: EntityManager): RequestHandler {
  return async (req, res) => {
    const usersRepository = em.getRepository(UserDataModel)

    const productsRepository = em.getRepository(ProductDataModel)

    const cartsRepository = em.getRepository(CartDataModel)
    const cartsProductRepository = em.getRepository(CartProductDataModel)

    const user1 = new User('1')
    const user2 = new User('2')
    await usersRepository.upsert(UserDataModel.fromDomain(user1))
    await usersRepository.upsert(UserDataModel.fromDomain(user2))

    const product1 = new Product('3', 'Product 1', 'Product 1 Description', 50)
    const product2 = new Product('4', 'Product 2', 'Product 2 Description', 28)
    await productsRepository.upsert(ProductDataModel.fromDomain(product1))
    await productsRepository.upsert(ProductDataModel.fromDomain(product2))

    const cart1 = new Cart('5', user1.id, false, [
      { product: product1, count: 2 },
    ])
    const cart1Model = CartDataModel.fromDomain(cart1)
    await cartsRepository.upsert(cart1Model)
    await cartsProductRepository.upsertMany(cart1Model.items.getItems())

    res.send(200)
  }
}
export default FillDB
