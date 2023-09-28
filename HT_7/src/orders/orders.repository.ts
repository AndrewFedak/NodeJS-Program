import { EntityManager } from "@mikro-orm/core";
import { SqlEntityRepository } from "@mikro-orm/postgresql";

import { OrderDataModel } from "../config/data-models/order/order";

import { Order } from "./orders.entity";

export interface IOrdersRepository {
    create(order: Order): Promise<void>
}

export class OrdersRepository implements IOrdersRepository {
    private _ormOrdersRepository: SqlEntityRepository<OrderDataModel>
    constructor(
        _em: EntityManager
    ) {
        this._ormOrdersRepository = _em.getRepository(OrderDataModel)
    }
    async create(order: Order): Promise<void> {
        await this._ormOrdersRepository.upsert(OrderDataModel.fromDomain(order))
    }
}