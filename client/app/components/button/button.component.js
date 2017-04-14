import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component {

  render() {
    return (
      <button className="btn" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}