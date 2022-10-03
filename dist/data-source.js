"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const port = process.env.DB_PORT_DEV;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST_DEV,
    port: port,
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*.{ts,js}"],
    migrations: ["./src/migrations/*.{ts,js}"],
    subscribers: [],
});
