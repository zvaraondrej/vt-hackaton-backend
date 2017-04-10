/**
 * Using Rails-like standard naming convention for endpoints.
 */

'use strict';

export default class EntityHandlerService {

  constructor() {}

  /**
  * GET /api/words -> words list
  */
  respondWithEntity(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if(entity) {
        return res.status(statusCode).json(entity);
      }
      return null;
    };
  }

}
