import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../index';
import data from './testData';


chai.use(chaiHttp);
const { expect } = chai;
chai.use(chaiHttp);

describe('Testing User Endpoint ', () => {
  it('expect user to sign up ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data.newUser)
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should fail to sign up', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.status(400);
        done();
      });
  });
});

describe('Testing user to sign in', () => {
  it('expect user to signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.login)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
  it('expect user to fail login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .end((err, res) => {
        expect(res.body).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should fail to login when email not found', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.failingEmail)
      .end((err, res) => {
        expect(res.body).to.have.status(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
