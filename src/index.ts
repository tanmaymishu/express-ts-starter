import app from './app';
import knex from 'knex';
import { Model } from 'objection';
import knexConfig from './database/knexfile';
import path from 'path';

const port = process.env.APP_PORT || 3000;

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex(knexConfig));

// Boot the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
