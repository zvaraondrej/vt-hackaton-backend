import React from 'react';
import WordsListItem from './../words-list-item/words-list-item.component';

export default class WordsList extends React.Component {

  render() {
    return (
       <div id="words-list" className="row btn-row grey lighten-4">
        <div className="col s12">
          {this.props.words.map(word => (
            <WordsListItem key={word} word={word}/>
          ))}
        </div>
      </div>
    )
  }
}