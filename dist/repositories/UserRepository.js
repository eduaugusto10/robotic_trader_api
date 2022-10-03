"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const data_source_1 = require("../data-source");
const UserEntity_1 = require("../entity/UserEntity");
exports.userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
