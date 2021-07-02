import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config({ path: "../../.env" });

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
    directory: "migrations",
  },
};

export default knexConfig;
