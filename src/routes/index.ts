import { Router } from "express";
import { CustomerManagerController } from "../controllers/CustomerManagerController";
import { CustomerOrderController } from "../controllers/CustomerOrderController";
import { OrderController } from "../controllers/OrderController";
import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router()

routes.post('/user', new UserController().store)
routes.post('/login', new SessionController().login)

routes.use(authMiddleware)
// Users
routes.get('/user/:id', new UserController().getById)
routes.get('/user', new UserController().getAll)
routes.delete('/user/:id', new UserController().delete)
routes.put('/user/:id', new UserController().update)

// Balance of Users
routes.get('/balance/:id', new CustomerManagerController().getById)
routes.get('/balance', new CustomerManagerController().getAll)
routes.post('/balance', new CustomerManagerController().store)
routes.put('/balance/:id', new CustomerManagerController().update)
routes.delete('/balance/:id', new CustomerManagerController().delete)

// Orders
routes.get('/order/:id', new OrderController().getById)
routes.get('/order', new OrderController().getAll)
routes.post('/order', new OrderController().store)
routes.put('/order/:id', new OrderController().update)
routes.delete('/order/:id', new OrderController().delete)

// Customer Orders
routes.get('/customerorder/:id', new CustomerOrderController().getById)
routes.get('/customerorder', new CustomerOrderController().getAll)
routes.post('/customerorder', new CustomerOrderController().store)
routes.put('/customerorder/:id', new CustomerOrderController().update)
routes.delete('/customerorder/:id', new CustomerOrderController().delete)


export default routes