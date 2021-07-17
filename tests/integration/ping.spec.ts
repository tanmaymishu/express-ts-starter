import request from 'supertest';
import app from '../../src/app';
import { refreshDB, initUser } from '../bootstrap';

describe('Ping', () => {
  let user: any;
  beforeEach(async () => {
    await refreshDB();
    user = await initUser();
  });

  describe('GET /ping', () => {
    it('returns pong', (done) => {
      request(app)
        .get('/api/v1/ping')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user.token)
        .expect(
          200,
          {
            message: 'pong'
          },
          done
        );
    });
  });
});
