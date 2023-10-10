import { CartItem } from "./cart-item";

export class Cart {
    constructor(
        public id: string,
        public userId: string,
        public isDeleted: boolean,
        public items: CartItem[],
    ) { }

    updateItem(updatedItem: CartItem) {
        this.items = this.items.map((itm) => itm.product.id === updatedItem.product.id ? updatedItem : itm)
    }

    deleteItem(productId: string) {
        this.items = this.items.filter((itm) => itm.product.id !== productId)
    }

    updateVisibility(isDeleted: boolean) {
        this.isDeleted = isDeleted
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

    empty() {
        this.items = []
    }
}