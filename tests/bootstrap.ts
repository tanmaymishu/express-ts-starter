import '../src/util/helpers';
import AuthService from '../src/services/auth.service';
import Container from 'typedi';
import { AppDataSource } from '../src/database/sql/data-source';

export async function initDB() {
  // (async () => {
  const connection = await AppDataSource.initialize();
  await connection.undoLastMigration();
  await connection.runMigrations({
    transaction: 'none'
  });
  // await connection.destroy();
  // })();
}

export async function refreshDB() {
  await initDB();
}

export async function initUser() {
  return await Container.get(AuthService).createUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password'
  });
}
