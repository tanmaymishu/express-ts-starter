import { Express } from "express";
import * as RegisterController from "../controllers/registerController";
import * as LoginController from "../controllers/loginController";
import { validateRequest } from "../middleware/validateRequest";

export function authRoutes(app: Express) {
    app.post('/register', RegisterController.schema, validateRequest, RegisterController.store);
    app.post('/login', LoginController.schema, validateRequest, LoginController.store);
}
