"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerOrderRepository = void 0;
const data_source_1 = require("../data-source");
const CustomerOrderEntity_1 = require("../entity/CustomerOrderEntity");
exports.customerOrderRepository = data_source_1.AppDataSource.getRepository(CustomerOrderEntity_1.CustomerOrderEntity);
