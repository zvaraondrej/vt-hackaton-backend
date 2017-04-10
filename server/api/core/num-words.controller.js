/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  product list
 * GET     /api/product/:id          ->  product detail
 */

'use strict';

import _ from 'lodash';
// import * as Products from './products.service';


export default class NumWordsController {

  constructor() {
    this.products = {
      getResult: function getResult(){
        return Promise.resolve('foo');
      }
    }
  }


  /**
  * GET /api/core/:id          ->  product detail
  */
  getResult(req, res) {

    try {
      return this.products.getResult()
		.then(this.handleEntityNotFound(res))
        .then(this.respondWithResult(res))
        .catch(this.handleError(res));
    } catch(e) {
      console.log(e);
      return res.status(500).send('Internal server error.');
    }
  }


  respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if(entity) {
        return res.status(statusCode).json(entity);
      }
      return null;
    };
  }


  handleEntityNotFound(res) {
    return function(entity) {
      if(!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  }


  handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
      console.log(err)
      return res.status(statusCode).send(err);
    };
  }


}
