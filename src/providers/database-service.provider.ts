import knex from 'knex';
import { connect } from 'mongoose';
import { Model } from 'objection';
import knexConfig from '../database/knexfile';
import ServiceProvider from "./service-provider";

export default class DatabaseServiceProvider extends ServiceProvider {
    async register() {
        // Bind all Models to a knex instance. If you only have one database in
        // your server this is all you have to do. For multi database systems, see
        // the Model.bindKnex() method.
        Model.knex(knex(knexConfig));

        // Connect to MongoDB. Example DSN: mongodb://username:password@localhost:27017/my_collection
        process.env.MONGO_DSN && await connect(process.env.MONGO_DSN);
    }
}
