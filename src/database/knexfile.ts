import dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

if (process.env.NODE_ENV == 'testing') {
  dotenv.config({ path: '.env.testing' });
} else {
  dotenv.config({ path: '../../.env' });
}

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection:
    process.env.NODE_ENV == 'testing'
      ? ':memory:'
      : {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      },
  useNullAsDefault: process.env.NODE_ENV == 'testing',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, 'sql/migrations')
  }
};

export default knexConfig;
