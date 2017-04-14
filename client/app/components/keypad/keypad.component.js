import React from 'react';
import ReactDOM from 'react-dom';
import Button from './../button/button.component';

export default class Keypad extends React.Component {

  renderButton(index){
    const buttons = this.props.buttons;
    return <Button value={buttons[index]} onClick={() => this.props.onClick(index)} />;
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.renderButton(0)}
          {this.renderButton(1)}
          {this.renderButton(2)}
        </div>
        <div className="row">
          {this.renderButton(3)}
          {this.renderButton(4)}
          {this.renderButton(5)}
        </div>
        <div className="row">
          {this.renderButton(6)}
          {this.renderButton(7)}
          {this.renderButton(8)}
        </div>
      </div>
    )
  }
}

