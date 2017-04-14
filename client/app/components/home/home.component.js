import React from 'react';
import ReactDOM from 'react-dom';
import Keypad from './../keypad/keypad.component';

export default class Home extends React.Component {

  constructor() {
    super();
    this.buttons = Array.from(new Array(9), (x,i) => i + 1);
  }

  handleClick(index) {
    const buttons = this.buttons.slice();
    console.log(buttons[index]);
  }

  render() {
    const buttons = this.buttons;
    return (
      <div className="container">
        <h1>Home Page</h1>
        <Keypad buttons={buttons} onClick={(i) => this.handleClick(i)} />
      </div>
    )
  }
}