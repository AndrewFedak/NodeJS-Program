import express, { Router, Request, Response, RequestHandler } from 'express'

import { User } from "../users/users.entity";
import { CartsService } from "./carts.service";

export class CartsController {
    constructor(
        private _cartsService: CartsService
    ) { }

    createCart: RequestHandler  = async (req, res) => {
        this._cartsService.createCart(req.user.id)
    }

    static init(cardsService: CartsService): Router {
        const cartsController = new CartsController(cardsService);

        const router = express.Router();
        router.get('asd', cartsController.createCart)
        return router
    }
}