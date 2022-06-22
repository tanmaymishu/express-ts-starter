import dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

if (process.env.NODE_ENV == 'testing') {
  dotenv.config({ path: '.env.testing' });
} else {
  dotenv.config({ path: '../../.env' });
}

function getConnectionConfig() {
  if (
    process.env.NODE_ENV === 'testing' &&
    process.env.DB_CLIENT === 'sqlite3'
  ) {
    return ':memory';
  }

  if (process.env.DB_CLIENT === 'sqlite3') {
    return { filename: './database.sqlite' };
  }

  return {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  };
}

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: getConnectionConfig(),
  useNullAsDefault: process.env.DB_CLIENT == 'sqlite3',
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
