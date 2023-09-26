import { IDatabase } from "../infrastructure/idatabase";
import { Order } from "./orders.entity";

export interface IOrdersRepository {
    create(order: Order): Promise<void>
}

export class OrdersRepository implements IOrdersRepository {
    constructor(
        private _db: IDatabase
    ) {}
    async create(order: Order): Promise<void> {
        this._db.orders.push(order)
    }
}