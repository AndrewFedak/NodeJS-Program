import { RequestHandler } from "express"
import { EntityManager } from "@mikro-orm/core";

import { UserDataModel } from "./data-models/user";
import { OrderDataModel } from "./data-models/order/order";
import { ProductDataModel } from "./data-models/product";
import { CartDataModel } from "./data-models/cart/cart";

import { Cart } from "../carts/carts.entity";
import { Order } from "../orders/orders.entity";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";
import { CartProductDataModel } from "./data-models/cart/cart-product";
import { OrderProductDataModel } from "./data-models/order/order-product";

const FillDB = (em: EntityManager): RequestHandler => async (req, res) => {
    const usersRepository = em.getRepository(UserDataModel);
    const productsRepository = em.getRepository(ProductDataModel);
    const cartsRepository = em.getRepository(CartDataModel);
    const cartsProductRepository = em.getRepository(CartProductDataModel);
    const ordersProductRepository = em.getRepository(OrderProductDataModel);

    const user1 = new User('1')
    const user2 = new User('2')
    await usersRepository.upsert(UserDataModel.fromDomain(user1))
    await usersRepository.upsert(UserDataModel.fromDomain(user2))

    const product1 = new Product('3', 'Product 1', 'Product 1 Description', 50)
    const product2 = new Product('4', 'Product 2', 'Product 2 Description', 28)
    await productsRepository.upsert(ProductDataModel.fromDomain(product1))
    await productsRepository.upsert(ProductDataModel.fromDomain(product2))

    const cart1 = new Cart('5', user1.id, false, [{count: 1, product: product1}])
    // await cartsRepository.upsert(CartDataModel.fromDomain(cart1))    will NOT work
    await cartsRepository.upsert({id: cart1.id, isDeleted: cart1.isDeleted, userId: cart1.userId})
    await cartsProductRepository.upsertMany([{id: '1', cartId: cart1.id, product_id: product1.id, count: 2}])

    // const order1 = new Order('6', cart1.id, user1.id, cart1.getItems(), cart1.getTotal(), {type: 'cash'}, {type: 'self-pickup', address: 'St. Some street'}, 'created')
    // ordersRepository.nativeInsert(OrderDataModel.fromDomain(order1))


    res.send('Initialized')
}
export default FillDB