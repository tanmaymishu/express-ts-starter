import User from '../../src/database/models/user';
import * as authService from '../../src/services/auth.service';
import { expect } from 'chai';

describe('auth', () => {
  describe('auth service', () => {
    it('can generate JWT for a user', async () => {
      const user = User.factory().makeOne({ $id: () => 1 } as User);
      expect(authService.generateJwt(user)).to.be.a('string');
    });
  });
});
