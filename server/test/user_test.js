import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('test signup endpoint', () => {
    it('should create a user', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
            })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(201);
            expect(res.body.newUser).to.be.an('object');
            expect(res.body.token).to.be.a('string');
            expect(res.body.newUser.id).to.be.an('number');
            expect(res.body.newUser.email).to.be.a('string');
            expect(res.body.newUser.first_name).to.be.a('string');
            expect(res.body.newUser.last_name).to.be.a('string');
            expect(res.body.newUser.address).to.be.a('string');
            expect(res.body.newUser.phone_number).to.be.a('string');
            expect(res.body.newUser.password).to.be.a('string');
            assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
            assert.strictEqual(res.body.status, 201, 'Status is not 201');
            assert.isObject(res.body, 'Response is not an object');
            assert.isObject(res.body.newUser, 'Data is not an object');
            assert.isString(res.body.token, 'Token is not a string');
            assert.isNumber(res.body.newUser.id, 'ID is not a number');
            assert.isString(res.body.newUser.email, 'Email is not a string');
            assert.isString(res.body.newUser.first_name, 'Firstname is not a string');
            assert.isString(res.body.newUser.last_name, 'Lastname is not a string');
            assert.isString(res.body.newUser.address, 'Adress is not a string');
            assert.isString(res.body.newUser.phone_number, 'Phone number is not a string');
            assert.isString(res.body.newUser.password, 'Password is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if firstname or lastname is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: '',
            last_name: '',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname is required',
              'Expect error to be firstname or lastname is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if firstname or lastname contain a number', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'aguete3456',
            last_name: 'credo123',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname cannot contain number');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname cannot contain number',
              'Expect error to be firstname or lastname cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if firstname or lastname is less than 3 characters', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'ag',
            last_name: 'cr',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname should be more than 3 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname should be more than 3 characters',
              'Expect error to be firstname or lastname cannot be less than 3 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
         });
    
         it('Should return an error message if password is empty', (done) => {
         chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
             email: 'xyz@domain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: '',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('password is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'password is required',
              'Expect error to be password is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if password is less than 6 characters', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwert',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equals(400);
            expect(res.body.error).to.equals('password should be more than 6 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'password should be more than 6 characters',
              'Expect error to be password cannot be less than 6 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if email is not valid', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyzdomain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '123 rue Paris 19',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('provide a valid email address, please');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'provide a valid email address, please',
              'Expect error to be provide a valid email address, please');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      it('Should return an error message if phone number is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '123 rue Paris 19',
            phone_number : '',
            password: 'qwert123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('phone number is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'address is required',
              'Expect error to be phone number is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if address is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            email: 'xyz@domain.com',  
            first_name: 'aguete',
            last_name: 'credo',
            address: '',
            phone_number : '00228 70340529',
            password: 'qwerty123456',
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('address is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'address is required',
              'Expect error to be address is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    });


    describe('test signin endpoint', () => {
  it('should log an old user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set({
          'Content-type': 'application/json',
        })
        .send({
          email: 'xyz@domain.com',  
          first_name: 'aguete',
          last_name: 'credo',
          address: '123 rue Paris 19',
          phone_number : '00228 70340529',
          password: 'qwerty123456',
          })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.oldUser).to.be.an('object');
          expect(res.body.token).to.be.a('string');
          expect(res.body.oldUser.id).to.be.an('number');
          expect(res.body.oldUser.email).to.be.a('string');
          expect(res.body.oldUser.first_name).to.be.a('string');
          expect(res.body.oldUser.last_name).to.be.a('string');
          expect(res.body.oldUser.address).to.be.a('string');
          expect(res.body.oldUser.phone_number).to.be.a('string');
          expect(res.body.oldUser.password).to.be.a('string');
          assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
          assert.strictEqual(res.body.status, 201, 'Status is not 201');
          assert.isObject(res.body, 'Response is not an object');
          assert.isObject(res.body.oldUser, 'Data is not an object');
          assert.isString(res.body.token, 'Token is not a string');
          assert.isNumber(res.body.oldUser.id, 'ID is not a number');
          assert.isString(res.body.oldUser.email, 'Email is not a string');
          assert.isString(res.body.oldUser.first_name, 'Firstname is not a string');
          assert.isString(res.body.oldUser.last_name, 'Lastname is not a string');
          assert.isString(res.body.oldUser.address, 'Adress is not a string');
          assert.isString(res.body.oldUser.phone_number, 'Phone number is not a string');
          assert.isString(res.body.oldUser.password, 'Password is not a string');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
       it('Should return an error message if password is empty', (done) => {
       chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set({
          'Content-type': 'application/json',
        })
        .send({
           email: 'xyz@domain.com',  
          first_name: 'aguete',
          last_name: 'credo',
          address: '123 rue Paris 19',
          phone_number : '00228 70340529',
          password: '',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('password is required');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'password is required',
            'Expect error to be password is required');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
    it('Should return an error message if password doesn\'t match with the old one', (done) => {
      chai
       .request(app)
       .post('/api/v1/auth/signin')
       .set({
         'Content-type': 'application/json',
       })
       .send({
          email: 'xyz@domain.com',  
         first_name: 'aguete',
         last_name: 'credo',
         address: '123 rue Paris 19',
         phone_number : '00228 70340529',
         password: '',
       })
       .end((err, res) => {
         expect(res.body).to.be.an('object');
         expect(res.body.status).to.equals(400);
         expect(res.statusCode).to.equal(400);
         expect(res.body.error).to.equals('You insert a wrong password');
         assert.isObject(res.body, 'Response is not an object');
         assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
         assert.strictEqual(res.body.status, 400, 'Status is not 400');
         assert.strictEqual(res.body.error,
           'You insert a wrong password',
           'Expect error to be You insert a wrong password');
         assert.isNull(err, 'Expect error to not exist');
         done();
       });
   });
  

  });