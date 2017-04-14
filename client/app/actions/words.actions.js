
import * as types from './types';  
import WordsResource from './../api/words.resource';

export function fetchWords(param) {  
  return function(dispatch) {
    return WordsResource.getWords(param).then(words => {
      dispatch(fetchWordsSuccess(words));
    }).catch(error => {
      throw(error);
    });
  };
}

export function fetchWordsSuccess(words) {  
  return {type: types.FETCH_WORDS_SUCCESS, words};
}

export function clearWords(){
  return {type: types.CLEAR_WORDS, words: [] }
}
