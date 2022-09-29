import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";



const routes = Router()

routes.post('./user', new UserController().store)
routes.post('./login', new SessionController().login)

routes.use(authMiddleware)
routes.get('./user/:id', new UserController().getById)
routes.get('./user', new UserController().getAll)
routes.delete('./user/:id', new UserController().delete)
routes.put('./user/:id', new UserController().update)

export default routes