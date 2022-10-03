"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const data_source_1 = require("../data-source");
const OrderEntity_1 = require("../entity/OrderEntity");
exports.orderRepository = data_source_1.AppDataSource.getRepository(OrderEntity_1.OrderEntity);
