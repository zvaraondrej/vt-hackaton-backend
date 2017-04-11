import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App Page</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
}