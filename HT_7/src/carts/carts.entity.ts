import { Product } from "../products/products.entity";
import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        public id: string,
        public userId: string,
        public isDeleted: boolean,
        public items: CartItem[],
    ) { }

    updateItems(items: CartItem[]) {
        this.items = items
    }

    updateVisibility(isDeleted: boolean) {
        this.isDeleted = isDeleted
    }
    
    getTotal(): number {
        return this.items.reduce((total, item) => total + item.product.price * item.count, 0)
    }

    getItems() {
        return this.items
    }

    empty() {
        this.items = []
    }
}