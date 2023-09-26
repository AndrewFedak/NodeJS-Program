import { Product } from "../products/products.entity";
import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        public id: string,
        public userId: string,
        public isDeleted: boolean,
        public items: CartItem[],
    ) { }

    async addProduct(product: Product) {
        const item = this.findItem(product.id);
        if(!item) {
            this.items.push({
                product,
                count: 1
            })
        } else {
            item.count += 1
        }
    }

    private findItem(productId: string): CartItem | undefined {
        return this.items.find(item => item.product.id === productId)
    }
    
    getTotal(): number {
        return this.items.reduce((total, item) => total + item.product.price * item.count, 0)
    }

    getItems() {
        return this.items
    }
}