import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('test  flag ad endpoint', () => {
let flagAd;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/flag')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
      })
      .send({
        reason : 'pricing',
        ​description : 'lorem ipsum',
      })
      .end((err, res) => {
        flagAd = res.body.flag;
        done();
      });
  });

  //create  flag advertisement
    it('should create an ad', (done) => {
        chai
        .request(app)
        .post('/api/v1/flag')
        .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
        }).send({
            reason : 'pricing',
            ​description : 'lorem ipsum',
        }).end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.property).to.be.an('object');
            expect(res.body.flag.id).to.be.a('number');
            expect(res.body.flag.created_on).to.be.a('string'); 
            expect(res.body.property.reason).to.be.a('string');
            expect(res.body.property.description).to.be.a('string');
            assert.strictEqual(res.statusCode, 201, 'status code is not 201');
            assert.strictEqual(res.status, 201, 'status is not 201');
            assert.isObject(res.body, 'response is not an object');
            assert.isObject(res.body.flag, 'property is not an object');
            assert.isNumber(res.body.flag.id, 'id is not a number');
            assert.isString(res.body.flag.created_on, 'date is not a string');
            assert.isString(res.body.flag.reason, 'reason is not a string');
            assert.isString(res.body.flag.description, 'description is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
    });

     // request not authorized
     it('Should return an error if request is not authorized', (done) => {
        chai
          .request(app)
          .post('/api/v1/flag')
          .set({
            'Content-Type': 'application/json',
          })
          .send({
            reason : 'pricing',
            ​description : 'lorem ipsum',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body.error).to.equal('Authentication failed! Please Login again');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
            assert.strictEqual(res.body.status, 401, 'Status is not 401');
            assert.strictEqual(res.body.error,
              'Authentication failed! Please Login again',
              'Expect error to be Authentication failed! Please Login again');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // not valid token
      it('Should return an error if token is not valid', (done) => {
        chai
          .request(app)
          .post('/api/v1/flag')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOivIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VdpkB57CgI',
          })
          .send({
            reason : 'pricing',
            ​description : 'lorem ipsum',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(401);
            expect(res.body.error).to.equal('Authentication failed! Please Login again');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
            assert.strictEqual(res.body.status, 401, 'Status is not 401');
            assert.strictEqual(res.body.error,
              'Authentication failed! Please Login again',
              'Expect error to be Authentication failed! Please Login again');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
})