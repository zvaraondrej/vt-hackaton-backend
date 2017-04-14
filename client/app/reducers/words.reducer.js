import * as types from './../actions/types';  
import initialState from './initialState';

export default function wordsReducer(state = initialState.words, action) {  
  switch(action.type) {
    case types.FETCH_WORDS_SUCCESS:
      return action.words
    case types.CLEAR_WORDS:
      return action.words;
    default: 
      return state;
  }
}