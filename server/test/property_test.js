import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('test property ad endpoint', () => {
let propertyAd;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
      })
      .send({
         status :​ 'available',
         price : 450,
​         state :  'Lome',
​         city  : 'Be',
         type  : 'mini flat',
         bedrooms: 234,
         category : 'for sale',
      })
      .end((err, res) => {
        propertyAd = res.body.property;
        done();
      });
  });

  //create  property advertisement
    it('should create an ad', (done) => {
        chai
        .request(app)
        .post('/api/v1/property')
        .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
        }).send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
            title : 'luxury 3 bedroom mini flat',
            description : 'lorem ipsum',
            image_url : 'www.image.comk/myhouse'
        }).end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.property).to.be.an('object');
            expect(res.body.property.id).to.be.a('number');
            expect(res.body.property.created_on).to.be.a('string'); 
            expect(res.body.property.state).to.be.a('string');
            expect(res.body.property.city).to.be.a('string');
            expect(res.body.property.status).to.be.a('string');
            expect(res.body.property.price).to.be.a('number');
            expect(res.body.property.category).to.be.a('string'); 
            expect(res.body.property.bedrooms).to.be.a('number');
            expect(res.body.property.description).to.be.a('string'); 
            expect(res.body.property.title).to.be.a('string'); 
            expect(res.body.property.image_url).to.be.a('string'); 
            assert.strictEqual(res.statusCode, 201, 'status code is not 201');
            assert.strictEqual(res.status, 201, 'status is not 201');
            assert.isObject(res.body, 'response is not an object');
            assert.isObject(res.body.property, 'property is not an object');
            assert.isNumber(res.body.property.id, 'id is not a number');
            assert.isString(res.body.property.created_on, 'date is not a string');
            assert.isString(res.body.property.state, 'state is not a string');
            assert.isString(res.body.property.city, 'city is not a string');
            assert.isString(res.body.property.status, 'status is not a string');
            assert.isNumber(res.body.property.price, 'price is not a number'); 
            assert.isString(res.body.property.category, 'category is not a string');
            assert.isNumber(res.body.property.bedrooms, 'bedrooms is not a number'); 
            assert.isString(res.body.property.title, 'title is not a string');
            assert.isString(res.body.property.description, 'description is not a string');
            assert.isString(res.body.property.image_url, 'image url is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
    });

    // request not authorized
    it('Should return an error if request is not authorized', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
          })
          .send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
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
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOivIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VdpkB57CgI',
          })
          .send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
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

      //State or city cannot contain number
      it('Should return an error message if state or city field contains a number', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome12344',
   ​         city  : 'Be1234',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('car manufacturer cannot contain number');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'car state or city cannot contain number',
              'Expect error to be state or city cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // state or city field cannot be empty
      it('Should return an error message if model field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            status :​ 'available',
            price : 450,
   ​         state :  '',
   ​         city  : '',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Car model is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Car model is required',
              'Expect error to be Car model is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      // type cannot be empty
      it('Should return an error message if type field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : '',
            bedrooms: 234,
            category : 'for sale',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Enter a valid year, please');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Enter a valid year, please', 'Expect error to be Enter a valid year, please');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      
      
      // price should be a number
      it('Should return an error message if price is not number', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            status :​ 'available',
            price : 'price',
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('price is invalid');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'price is invalid', 'Expect error to be price is invalid');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // status should not contain number
      it('Should return an error message if status is different from available/sold', (done) => {
        chai
          .request(app)
          .post('/api/v1/property')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            status :​ 'qwertyu',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            bedrooms: 234,
            category : 'for sale',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Status cannot contain number');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Status cannot contain number', 'Expect error to be Status cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      
      // view a specific property test
      it('Should get a specific property', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property/${propertyAd.id}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.property).to.be.an('object');
            expect(res.body.property.id).to.be.a('number');
            expect(res.body.property.created_on).to.be.a('string'); 
            expect(res.body.property.state).to.be.a('string');
            expect(res.body.property.city).to.be.a('string');
            expect(res.body.property.status).to.be.a('string');
            expect(res.body.property.price).to.be.a('number');
            expect(res.body.property.category).to.be.a('string'); 
            expect(res.body.property.title).to.be.a('string');
            expect(res.body.property.description).to.be.a('string');
            expect(res.body.property.image_url).to.be.a('string');
            expect(res.body.property.image_url).to.be.a('string');
            assert.strictEqual(res.statusCode, 200, 'status code is not 200');
            assert.isObject(res.body, 'response is not an object');
            assert.isObject(res.body.property, 'property is not an object');
            assert.isNumber(res.body.property.id, 'id is not a number');
            assert.isString(res.body.property.created_on, 'date is not a string');
            assert.isString(res.body.property.state, 'state is not a string');
            assert.isNumber(res.body.property.city, 'city is not a string');
            assert.isString(res.body.property.status, 'status is not a string');
            assert.isNumber(res.body.property.price, 'price is not a number'); 
            assert.isString(res.body.property.category, 'category is not a string');
            assert.isString(res.body.property.title, 'title is not a string');
            assert.isNumber(res.body.property.description, 'description is not a string');
            assert.isNumber(res.body.property.image_url, 'image url is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // Properties for a different category between a price range
      it('Should return all properties for a different category between a price range', (done) => {
        chai
          .request(app)
          .get(`/api/v1/car?category=${propertyAd.category}&min_price=100000&max_price=150000`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      // get all properties
      it('Should return all properties', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property/${propertyAd.id}/`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.properties).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.properties, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    // available properties
      it('Should return all available properties ', (done) => {
        chai
          .request(app)
          .get('/api/v1/property?status=available')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
          //properties of specific category and type
            it('Should return all available cars of a specific state', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property?category=${propertyAd.category}&state=${propertyAd.type}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });


         //properties of specific category and state
      it('Should return all available cars of a specific state', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property?category=${propertyAd.category}&state=${propertyAd.state}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
       // properties of specific category and  city
       it('Should return all available cars of a specific state', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property?category=${propertyAd.category}&city=${propertyAd.city}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
       //properties of specific category
       it('Should return all available cars of a specific state', (done) => {
        chai
          .request(app)
          .get(`/api/v1/property?category=${propertyAd.category}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.data, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // delete property ad test
      it('Should delete an AD', (done) => {
        chai
          .request(app)
          .delete(`/api/v1/property/${propertyAd.id}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.equal('Property deleted successfully');
            expect(res.body.message).to.be.a('string');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isString(res.body.message, 'Data is not a string');
            assert.strictEqual(res.body.message,
              'Property deleted successfully',
              'Data is not equal to Car deleted successfully');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });  

      //update  property advertisement
    it('should update an ad', (done) => {
      chai
      .request(app)
      .patch(`/api/v1/${propertyAd.id}`)
      .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
      }).send({
          status :​ 'available',
          price : 450,
 ​         state :  'Lome',
 ​         city  : 'Be',
          type  : 'mini flat',
          category : 'for sale',
          title : 'luxury 3 bedroom mini flat',
          description : 'lorem ipsum',
          image_url : 'www.image.comk/myhouse'
      }).end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.property).to.be.an('object');
          expect(res.body.property.state).to.be.a('string');
          expect(res.body.property.city).to.be.a('string');
          expect(res.body.property.price).to.be.a('number');
          expect(res.body.property.category).to.be.a('string'); 
          expect(res.body.property.bedrooms).to.be.a('number');
          expect(res.body.property.description).to.be.a('string'); 
          expect(res.body.property.title).to.be.a('string'); 
          expect(res.body.property.image_url).to.be.a('string'); 
          assert.strictEqual(res.statusCode, 201, 'status code is not 201');
          assert.strictEqual(res.status, 201, 'status is not 201');
          assert.isObject(res.body, 'response is not an object');
          assert.isObject(res.body.property, 'property is not an object');
          assert.isString(res.body.property.state, 'state is not a string');
          assert.isString(res.body.property.city, 'city is not a string');
          assert.isNumber(res.body.property.price, 'price is not a number'); 
          assert.isString(res.body.property.category, 'category is not a string');
          assert.isNumber(res.body.property.bedrooms, 'bedrooms is not a number'); 
          assert.isString(res.body.property.title, 'title is not a string');
          assert.isString(res.body.property.description, 'description is not a string');
          assert.isString(res.body.property.image_url, 'image url is not a string');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
  });
      

      //update  property status as sold
      it('should update an ad', (done) => {
        chai
        .request(app)
        .patch(`/api/v1/${propertyAd.id}/sold`)
        .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
        }).send({
            status :​ 'available',
            price : 450,
   ​         state :  'Lome',
   ​         city  : 'Be',
            type  : 'mini flat',
            category : 'for sale',
            title : 'luxury 3 bedroom mini flat',
            description : 'lorem ipsum',
            image_url : 'www.image.comk/myhouse'
        }).end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.property).to.be.an('object');
            expect(res.body.property.status).to.be.a('string');
             assert.strictEqual(res.statusCode, 201, 'status code is not 201');
            assert.strictEqual(res.status, 201, 'status is not 201');
            assert.isObject(res.body, 'response is not an object');
            assert.isObject(res.body.property, 'property is not an object');
            assert.isString(res.body.property.status, 'status is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
    });
})