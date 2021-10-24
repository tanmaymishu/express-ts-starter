import '../src/util/helpers';
import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../src/database/knexfile';
import AuthService from '../src/services/auth.service';
import Container from 'typedi';

const $knex = knex(knexConfig);

export function initDB() {
  Model.knex($knex);
}

export async function refreshDB() {
  initDB();
  await $knex.migrate.rollback();
  await $knex.migrate.latest();
}

export async function initUser() {
  return await Container.get(AuthService).createUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password'
  });
}
