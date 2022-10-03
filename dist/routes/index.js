"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerManagerController_1 = require("../controllers/CustomerManagerController");
const CustomerOrderController_1 = require("../controllers/CustomerOrderController");
const OrderController_1 = require("../controllers/OrderController");
const SessionController_1 = require("../controllers/SessionController");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const routes = (0, express_1.Router)();
routes.post('/user', new UserController_1.UserController().store);
routes.get('/user-by-account/:account', new UserController_1.UserController().getByAccount);
routes.post('/login', new SessionController_1.SessionController().login);
routes.use(authMiddleware_1.authMiddleware);
// Users
routes.get('/user/:id', new UserController_1.UserController().getById);
routes.get('/user', new UserController_1.UserController().getAll);
routes.delete('/user/:id', new UserController_1.UserController().delete);
routes.put('/user/:id', new UserController_1.UserController().update);
// Balance of Users
routes.get('/balance/:id', new CustomerManagerController_1.CustomerManagerController().getById);
routes.get('/balance', new CustomerManagerController_1.CustomerManagerController().getAll);
routes.post('/balance', new CustomerManagerController_1.CustomerManagerController().store);
routes.put('/balance/:id', new CustomerManagerController_1.CustomerManagerController().update);
routes.delete('/balance/:id', new CustomerManagerController_1.CustomerManagerController().delete);
// Orders
routes.get('/order/:id', new OrderController_1.OrderController().getById);
routes.get('/order', new OrderController_1.OrderController().getAll);
routes.post('/order', new OrderController_1.OrderController().store);
routes.put('/order/:id', new OrderController_1.OrderController().update);
routes.delete('/order/:id', new OrderController_1.OrderController().delete);
// Customer Orders
routes.get('/customerorder/:id', new CustomerOrderController_1.CustomerOrderController().getById);
routes.get('/customerorder', new CustomerOrderController_1.CustomerOrderController().getAll);
routes.post('/customerorder', new CustomerOrderController_1.CustomerOrderController().store);
routes.put('/customerorder/:id', new CustomerOrderController_1.CustomerOrderController().update);
routes.delete('/customerorder/:id', new CustomerOrderController_1.CustomerOrderController().delete);
exports.default = routes;
