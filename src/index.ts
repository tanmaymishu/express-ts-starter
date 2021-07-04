import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import knex from "knex";
import { Model } from "objection";
import knexConfig from "./database/knexfile";
import "./util/passport";
import "./util/helpers";
import logger from "./util/logger";
import morganLogger from "./middleware/morgan.middleware";
import routes from "./routes";

// Create an express app.
const app = express();
const port = process.env.APP_PORT || 3000;

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex(knexConfig));

// Parse the application/json request body.
app.use(express.json());
// Parse the x-www-form-urlencoded request body.
app.use(express.urlencoded({ extended: true }));
// Parse the form-data request body.
app.use(multer().any());

// Log the incoming requests to console.
app.use(morganLogger);

// Register and mount the routes.
app.use("/", routes);

// Catch any error and send it as a json.
app.use(function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Catch 404.
app.use(function (req: Request, res: Response) {
  return res.status(404).json({ message: "Page Not Found!" });
});

// Boot the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
