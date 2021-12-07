import User from '../../src/database/sql/models/user';
import { expect } from 'chai';
import Container from 'typedi';
import AuthService from '../../src/services/auth.service'
import UserSQLRepository from '../../src/repositories/user-sql-repository';

describe('auth', () => {
  describe('auth service', () => {
    it('can generate JWT for a user', async () => {
      Container.set('user.repository', new UserSQLRepository());
      const user = User.factory().makeOne({ getId: () => 1 } as User);
      expect(Container.get(AuthService).generateJwt(user)).to.be.a('string');
    });
  });
});
