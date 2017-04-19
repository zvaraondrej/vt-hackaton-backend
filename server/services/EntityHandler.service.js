/**
 * Success entity handler
 */

'use strict';

export default class EntityHandlerService {

  constructor() {}

  /**
  * Return code 200 and json entity
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
