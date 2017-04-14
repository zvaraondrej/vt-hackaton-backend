import config from './../../../server/config';

export default class WordsResource {  

  static getWords(param) {
    let endpoint = 'api/words';
    return fetch(`http://${config.ip}:${config.port}/${endpoint}?value=${param}`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}