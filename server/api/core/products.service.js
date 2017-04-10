import * as WatchEntity from './../../services/entities/WatchEntity.service';

export function getProduct(id, lang) {

  return WatchEntity.getWatch(id, lang)

  .then(function(res) {
    return res;
  })

  .catch(function(err) {
    return Promise.reject(err);
  });
}

export function getProducts(type, lang) {

  return WatchEntity.getWatches(type, lang)

  .then(function(res) {
    return res;
  })

  .catch(function(err) {
    return Promise.reject(err);
  });
}
