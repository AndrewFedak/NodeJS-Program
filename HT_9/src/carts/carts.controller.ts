import express, { Router, RequestHandler } from 'express'

import { ResponseDataAndError } from '@src/infrastructure/response-data-and-error'
import { AuthorizationMiddleware } from '@src/infrastructure/middlewares/authorization'
import { errorWrapper } from '@src/infrastructure/exceptions/handler-wrapper'

import { CartsService } from './carts.service'
import { UpdateCartDto } from './dto/update-cart.dto'

export class CartsController {
  constructor(private _cartsService: CartsService) {}

  static init(cardsService: CartsService): Router {
    const router = express.Router()

    const baseRoute = '/profile'
    const cartsController = new CartsController(cardsService)

    router.post(`${baseRoute}/cart`, cartsController.createCart)
    router.get(`${baseRoute}/cart`, cartsController.getOrCreateCart)
    router.put(`${baseRoute}/cart`, cartsController.updateCart)
    router.delete(
      `${baseRoute}/cart`,
      AuthorizationMiddleware.isAdmin,
      cartsController.emptyCart,
    )
    router.post(`${baseRoute}/cart/checkout`, cartsController.checkout)

    return router
  }

  createCart: RequestHandler = errorWrapper(async (req, res) => {
    const cart = await this._cartsService.createNewCart(req.user.id)
    res.status(201).json(ResponseDataAndError.format({ cart }))
  })

  getOrCreateCart: RequestHandler = errorWrapper(async (req, res) => {
    const cart = await this._cartsService.getOrCreateCart(req.user.id)
    res.status(200).json(ResponseDataAndError.format({ cart }))
  })

  updateCart = errorWrapper(async (req, res) => {
    const updateCartDto = UpdateCartDto.validate(req.body)
    const cart = await this._cartsService.updateCart(updateCartDto)
    res.status(200).json(
      ResponseDataAndError.format({
        cart,
        totalPrice: cart.getTotal(),
      }),
    )
  })

  emptyCart: RequestHandler = errorWrapper(async (req, res) => {
    await this._cartsService.emptyCart(req.user.id)
    res.status(200).json(
      ResponseDataAndError.format({
        success: true,
      }),
    )
  })

  checkout: RequestHandler = errorWrapper(async (req, res) => {
    const order = await this._cartsService.checkout(req.user.id)
    res.status(201).json(ResponseDataAndError.format({ order }))
  })
}
