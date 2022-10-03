"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerManagerRepository = void 0;
const data_source_1 = require("../data-source");
const CustomerManagerEntity_1 = require("../entity/CustomerManagerEntity");
exports.customerManagerRepository = data_source_1.AppDataSource.getRepository(CustomerManagerEntity_1.CustomerManagerEntity);
