/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  product list
 * GET     /api/product/:id          ->  product detail
 */

'use strict';

import _ from 'lodash';

import ERROR from './../enums/Error.enum';

export default class ErrorHandlerService {

  constructor() {
    this.ERROR = ERROR;
  }

  respondEntityNotFound(res) {
    return function(entity) {
      if(!entity) {
        res.status(404).json({ msg: this.ERROR.MSG.NOT_FOUND});
        return null;
      }
      return entity;
    };
  }

  handleError(res, statusCode, msg) {
    statusCode = statusCode || 500;
    return function(err) {
      err = msg || err;
      return res.status(statusCode).json({ msg: err.toString()});
    };
  }



}
