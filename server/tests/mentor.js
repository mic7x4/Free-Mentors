import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);
const { expect } = chai;
chai.use(chaiHttp);

describe('Admin change user to mentor', () => {
  it('should change normal user to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/2')
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('isMentor').equals(true);
        done();
      });
  });

  it('should fail to change user to mentor', (done) => {
    chai.request(app)
      .patch('/api/v1/user/8')
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status').equals(404);
        done();
      });
  });
});

describe('expect Authorized user to see all mentor', () => {
  it('expect user see all mentor ', (done) => {
    chai.request(app)
      .get('/api/v1/mentors')
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status').equals(200);
        done();
      });
  });
});
describe('Expects user to see a specific mentor', () => {
  it('expect user see Spesfic mentor ', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/1')
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(200);
        expect(res.body).to.have.property('data').is.an('object');
        done();
      });
  });

  it('should fail to see mentor', (done) => {
    chai.request(app)
      .get('/api/v1/mentors/20')
      .end((err, res) => {
        expect(res.body).to.have.property('status').equals(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
