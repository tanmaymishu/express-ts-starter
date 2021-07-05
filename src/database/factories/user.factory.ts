import User from '../models/user';
import faker from 'faker';
import bcrypt from 'bcrypt';
import BaseFactory from './base-factory';
import Factory from './factory';

export default class UserFactory
  extends BaseFactory<User>
  implements Factory<User>
{
  definition() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.unique(faker.internet.exampleEmail),
      password: bcrypt.hashSync('password', 10)
    } as User;
  }
}
