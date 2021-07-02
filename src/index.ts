import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import knex from "knex";
import { Model, ForeignKeyViolationError, ValidationError } from "objection";
import * as knexConfig from "./database/knexfile";
import "./util/passport";
import "./util/helpers";
import Logger from "./util/logger";
import morganMiddleware from "./middleware/morganMiddleware";
import { registerRoutes } from "./routes";

// Create an express app.
const app = express();
const port = process.env.APP_PORT || 3000;

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
let $knex = knex(knexConfig.development);
switch (process.env.NODE_ENV) {
  case "production":
    $knex = knex(knexConfig.production);
    break;
  case "testing":
    $knex = knex(knexConfig.testing);
    break;
}

Model.knex($knex);

// Parse the application/json request body.
app.use(express.json());
// Parse the x-www-form-urlencoded request body.
app.use(express.urlencoded({ extended: true }));
// Parse the form-data request body.
app.use(multer().any());

// Log the incoming requests to console.
app.use(morganMiddleware);

// Register the routes.
registerRoutes(app);

// Catch any error and send it as a json.
app.use(function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    Logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Boot the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
