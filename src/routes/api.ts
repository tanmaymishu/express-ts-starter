import { Express, NextFunction, Request, Response } from "express";
import passport from "passport";
import * as PingController from "../controllers/ping.controller";

export function apiRoutes(app: Express) {
  app.get(
    "/ping",
    passport.authenticate("jwt", { session: false }),
    PingController.pong
  );
}
