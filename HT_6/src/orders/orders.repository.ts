import { IInMemoryDatabase } from "../infrastructure/in-memory.database";
import { Order } from "./orders.entity";

export interface IOrdersRepository {
    create(order: Order): Promise<void>
}

export class OrdersRepository implements IOrdersRepository {
    constructor(
        private _db: IInMemoryDatabase
    ) {}
    async create(order: Order): Promise<void> {
        this._db.orders.push(order)
    }
}