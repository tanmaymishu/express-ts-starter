import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
if (process.env.NODE_ENV == 'testing') {
  dotenv.config({ path: '.env.testing' });
} else {
  dotenv.config({ path: '.env' });
}

export const AppDataSource = new DataSource({
  synchronize: false,
  type: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./dist/database/sql/entities/*.entity.js'],
  migrations: ['./dist/database/sql/migrations/*'],
  namingStrategy: new SnakeNamingStrategy()
} as DataSourceOptions);
