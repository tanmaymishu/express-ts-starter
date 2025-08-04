import '../src/util/helpers';
import AuthService from '../src/services/auth.service';
import Container from 'typedi';
import { AppDataSource } from '@/database/sql/data-source';

export async function initDB() {
  // Initialize if not already done (reuse existing connection)
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  // Drop all tables and recreate from migrations for clean test state
  await AppDataSource.dropDatabase();
  await AppDataSource.synchronize();

  // Run all migrations to ensure proper schema
  await AppDataSource.runMigrations({
    transaction: 'none'
  });
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
