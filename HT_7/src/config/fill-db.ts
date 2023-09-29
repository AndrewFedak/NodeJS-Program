import { RequestHandler } from 'express'
import { EntityManager } from '@mikro-orm/core'

import { UserDataModel } from './data-models/user'

import { ProductDataModel } from './data-models/product'

import { CartDataModel } from './data-models/cart/cart'
import { CartProductDataModel } from './data-models/cart/cart-product'

import { OrderDataModel } from './data-models/order/order'
import { OrderProductDataModel } from './data-models/order/order-product'

import { Cart } from '@src/carts/carts.entity'

import { Order } from '@src/orders/orders.entity'
import { Payment } from '@src/orders/payment'
import { Delivery } from '@src/orders/delivery'

import { Product } from '@src/products/products.entity'

import { User } from '@src/users/users.entity'
import { OrderPaymentDataModel } from './data-models/order/order-payment'
import { OrderDeliveryDataModel } from './data-models/order/order-delivery'

const FillDB =
  (em: EntityManager): RequestHandler =>
  async (req, res) => {
    const usersRepository = em.getRepository(UserDataModel)
    
    const productsRepository = em.getRepository(ProductDataModel)
    
    const cartsRepository = em.getRepository(CartDataModel)
    const cartsProductRepository = em.getRepository(CartProductDataModel)

    const ordersRepository = em.getRepository(OrderDataModel)
    const ordersProductRepository = em.getRepository(OrderProductDataModel)
    const ordersDeliveryRepository = em.getRepository(OrderDeliveryDataModel)
    const ordersPaymentRepository = em.getRepository(OrderPaymentDataModel)

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
    const cartModel = CartDataModel.fromDomain(cart1)
    await cartsRepository.upsert(cartModel)
    await cartsProductRepository.upsertMany(cartModel.items.getItems())

    const order1 = new Order(
      '6',
      cart1.id,
      user1.id,
      cart1.getItems(),
      cart1.getTotal(),
      new Payment('1', 'card'),
      new Delivery('1', 'courier', 'smth'),
      'created',
    )

    await ordersDeliveryRepository.upsert(OrderDeliveryDataModel.fromDomain(order1.delivery))
    await ordersPaymentRepository.upsert(OrderPaymentDataModel.fromDomain(order1.payment))

    const orderModel = OrderDataModel.fromDomain(order1)
    await ordersRepository.upsert(orderModel)
    await ordersProductRepository.upsertMany(orderModel.items.getItems())

    res.send(200)
  }
export default FillDB
