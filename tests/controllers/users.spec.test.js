import '@babel/polyfill';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

const user = {
  email: 'jetbaseuser@jetbase.com',
  password: 'jetbaseadmin',
};

const admin = {
  email: 'jetbaseadmin@jetbase.com',
  password: 'jetbaseadmin',
};

const validNewUser = {
  email: 'jetbasenew@jetbase.com',
  password: 'jetbaseadmin',
  last_name: 'JetBase2',
  first_name: 'JetBase2',
  password_confirmation: 'jetbaseadmin',
};

const notMatchPasswordUser = {
  email: 'notMatchPasswordUser@jetbase.com',
  password: 'jetbaseadmin',
  last_name: 'JetBase2',
  first_name: 'JetBase2',
  password_confirmation: 'asdsadasdasd',
};

const invalidNewUser = {
  password: 'jetbaseadmin',
  last_name: 'JetBase2',
  password_confirmation: 'jetbaseadmin',
};

describe('USER', async () => {
  describe('/GET Get registered users', () => {
    it('response 200, if user exist if request from admin user', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .get(`/api/v1/users`)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 200);
              assert.isArray(res.body.items);
              done();
            });
        });
    });
    it('response 403, if user exist if request from user role user', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(user)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .get(`/api/v1/users`)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 403);
              done();
            });
        });
    });
    it('response 401, if user not log in', (done) => {
      chai
        .request(app)
        .get(`/api/v1/users`)
        .end((_, res) => {
          assert.strictEqual(res.status, 401);
          done();
        });
    });
  });

  describe('/POST Create new user', () => {
    it('response 200, if request from admin and new user is valid', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .post(`/api/v1/users`)
            .send(validNewUser)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 200);
              done();
            });
        });
    });
    it('response 400, if request from admin and new user is invalid', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .post(`/api/v1/users`)
            .send(invalidNewUser)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 400);
              done();
            });
        });
    });
    it('response 400, if request from admin and password not match', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .post(`/api/v1/users`)
            .send(notMatchPasswordUser)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 400);
              done();
            });
        });
    });
    it('response 400, if request from admin and email is exist', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .post(`/api/v1/users`)
            .send(admin)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 400);
              done();
            });
        });
    });
    it('response 403, if request from user and new user is valid', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(user)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .post(`/api/v1/users`)
            .send(validNewUser)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              assert.strictEqual(res.status, 403);
              done();
            });
        });
    });

    it('response 401, if user not a login', (done) => {
      chai
        .request(app)
        .post(`/api/v1/users`)
        .send(validNewUser)
        .end((_, res) => {
          assert.strictEqual(res.status, 401);
          done();
        });
    });
  });

  describe('/DELETE a user', () => {
    it('response 200, if request from admin and user exist in DB', (done) => {
      chai
        .request(app)
        .post(`/api/v1/login`)
        .send(admin)
        .end((_, res) => {
          const { token } = res.body;
          chai
            .request(app)
            .get(`/api/v1/users`)
            .set('Authorization', `Bearer ${token}`)
            .end((_, res) => {
              const { id } = res.body.items[res.body.items.length - 1];
              chai
                .request(app)
                .delete(`/api/v1/users/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((_, res) => {
                  assert.strictEqual(200, res.status);
                  done();
                });
            });
        });
    });
  });
});
