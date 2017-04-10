'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var productsCtrlStub = {
  getProduct: 'productsCtrl.getProduct',
  getProducts: 'productsCtrl.getProducts'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var productsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './products.controller': productsCtrlStub
});

describe('Products API Router:', function() {
  it('should return an express router instance', function() {
    productsIndex.should.equal(routerStub);
  });

  describe('GET /api/products', function() {
    it('should route to products.controller.getProducts', function() {
      routerStub.get
        .withArgs('/', 'productsCtrl.getProducts')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/products/:id', function() {
    it('should route to products.controller.getProduct', function() {
      routerStub.get
        .withArgs('/:id', 'productsCtrl.getProduct')
        .should.have.been.calledOnce;
    });
  });
});
