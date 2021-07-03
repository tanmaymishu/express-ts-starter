import { Express } from "express";
import * as RegisterController from "../controllers/register.controller";
import * as LoginController from "../controllers/login.controller";
import { validateRequest } from "../middleware/validation.middleware";

export function authRoutes(app: Express) {
  app.post(
    "/register",
    RegisterController.schema,
    validateRequest,
    RegisterController.store
  );
  app.post(
    "/login",
    LoginController.schema,
    validateRequest,
    LoginController.store
  );
}
