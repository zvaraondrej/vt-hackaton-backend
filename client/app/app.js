/*eslint-disable import/default */
import React from 'react';  
import { render } from 'react-dom';  
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

const history = createBrowserHistory();

import Navbar from './components/common/navbar.component';
import App from './components/app.component';
import About from './components/about/about.component';
import Home from './components/home/home.component';

render(  
  <Router history={history}>
    <div>
      <Navbar/>

     	<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
    </div>
  </Router>,
 document.getElementById('app')
);

