import "../src/util/helpers";
import { Model } from "objection";
import knex from "knex";
import knexConfig from "../src/database/knexfile";

export default function bootstrap() {
  Model.knex(knex(knexConfig));
}
