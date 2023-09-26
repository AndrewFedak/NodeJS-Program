import { Product } from "../products/products.entity";

export class CartItem {
    constructor(
        public product: Product,
        public count: number
    ) {}
}