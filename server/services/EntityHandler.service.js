export default class EntityHandlerService {
  /**
  * Return code 200 and json entity
  */
  respondWithEntity(res, statusCode = 200) {
    return function (entity) {
      if (entity) {
        return res.status(statusCode).json(entity);
      }
      return null;
    };
  }
}
