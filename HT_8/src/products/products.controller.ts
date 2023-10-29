import { Router, RequestHandler } from 'express'

import { ResponseDataAndError } from '../infrastructure/response-data-and-error'
import { errorWrapper } from '../infrastructure/exceptions/handler-wrapper'

import { ProductsService } from './products.service'

export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  static init(productsService: ProductsService, router: Router) {
    const baseRoute = '/products'
    const productsController = new ProductsController(productsService)

    router.get(`${baseRoute}`, productsController.getListOfProducts)
    router.get(`${baseRoute}/:productId`, productsController.getSingleProduct)
  }

  getListOfProducts: RequestHandler = errorWrapper(async (req, res) => {
    const products = await this._productsService.getListOfProducts()
    res.status(200).json(ResponseDataAndError.format(products))
  })

  getSingleProduct: RequestHandler = errorWrapper(async (req, res) => {
    const products = await this._productsService.getSingleProduct(
      req.params.productId,
    )
    res.status(200).json(ResponseDataAndError.format(products))
  })
}
