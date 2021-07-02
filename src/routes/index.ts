import { Express } from "express";
import { apiRoutes } from "./api";
import { authRoutes } from "./auth";

export function registerRoutes(app: Express) {
  apiRoutes(app);
  authRoutes(app);
}
