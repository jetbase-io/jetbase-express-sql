import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { assert } = chai;
chai.use(chaiHttp);

const validUser = {
  email: 'jetbaseadmin@jetbase.com',
  password: 'jetbaseadmin',
};

const invalidUserEmail = {
  login: 'test@test.com',
  password: 'jetbaseadmin',
};

const invalidUserPassword = {
  email: 'jetbaseadmin@jetbase.com',
  password: 'test',
};

describe('AUTH', () => {
  describe('/POST Login user', () => {
    it('response 200, if user exist ', (done) => {
      chai
        .request(app)
        .post('/api/v1/login')
        .send(validUser)
        .end((_, res) => {
          assert.strictEqual(res.status, 200);
          done();
        });
    });
    it('response 400, if invalid email ', (done) => {
      chai
        .request(app)
        .post('/api/v1/login')
        .send(invalidUserEmail)
        .end((_, res) => {
          assert.strictEqual(res.status, 400);
          done();
        });
    });
    it('response 400, if invalid password ', (done) => {
      chai
        .request(app)
        .post('/api/v1/login')
        .send(invalidUserPassword)
        .end((_, res) => {
          assert.strictEqual(res.status, 400);
          done();
        });
    });
  });
});
