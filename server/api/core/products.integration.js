'use strict';

var app = require('../..');
import request from 'supertest';

var newProducts;

describe('Products API:', function() {
  describe('GET /api/products', function() {
    var productss;

    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          productss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      productss.should.be.instanceOf(Array);
    });
  });

  /*describe('GET /api/products/:id', function() {
    var products;

    beforeEach(function(done) {
      request(app)
        .get(`/api/products/${newProducts._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    afterEach(function() {
      products = {};
    });

    it('should respond with the requested products', function() {
      products.name.should.equal('New Products');
      products.info.should.equal('This is the brand new products!!!');
    });
  });*/
});
