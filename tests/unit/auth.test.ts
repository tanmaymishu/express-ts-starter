import { User } from '@/database/sql/entities/user.entity';
import Container from 'typedi';
import AuthService from '../../src/services/auth.service';

describe('auth', () => {
  describe('auth service', () => {
    it('can generate JWT for a user', async () => {
      const user = new User();
      user.firstName = 'John';
      user.lastName = 'Doe';
      user.email = 'john@example.com';
      user.password = 'password';
      user.id = 1;
      expect(Container.get(AuthService).generateJwt(user)).toBeDefined();
    });
  });
});
