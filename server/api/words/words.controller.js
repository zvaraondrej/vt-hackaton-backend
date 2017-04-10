/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  product list
 * GET     /api/product/:id          ->  product detail
 */

'use strict';

import T9Service from './T9Service.service';

export default class WordsController {

  constructor() {
    this.t9Service = new T9Service();
  }

  /**
  * GET /api/words -> words list
  */
  getWords(req, res) {

    var val = req.query && req.query.value ? _.toNumber(req.query.value) : null;

    // we are accepting only finite numbers
    if(!val && !_.isFinite(val)) {
      return res.status(500).send('Invalid value parameter.');
    }
    
    try {
      return this.t9Service.getWordsFromNumber(_.toNumber)
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
