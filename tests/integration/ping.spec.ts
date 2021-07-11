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
    it('returns unauthorized when not logged in', (done) => {
      request(app).get('/api/v1/ping').expect(401, 'Unauthorized', done);
    });

    it('returns pong when logged in', (done) => {
      request(app)
        .get('/api/v1/ping')
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
