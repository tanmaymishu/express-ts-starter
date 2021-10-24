import User from '../../src/database/sql/models/user';
import { expect } from 'chai';
import Container from 'typedi';
import AuthService from '../../src/services/auth.service'

describe('auth', () => {
  describe('auth service', () => {
    it('can generate JWT for a user', async () => {
      const user = User.factory().makeOne({ $id: () => 1 } as User);
      expect(Container.get(AuthService).generateJwt(user)).to.be.a('string');
    });
  });
});
