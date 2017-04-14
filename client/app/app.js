/*eslint-disable import/default */
import React from 'react';  
import { render } from 'react-dom';  
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import './../sass/main.scss';

const history = createBrowserHistory();

import Navbar from './components/common/navbar.component';
import Footer from './components/common/footer.component';
import App from './components/app.component';
import About from './components/about/about.component';
import Home from './components/home/home.component';

render(  
  <Router history={history}>
    <div>
      <Navbar/>
     	<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
      <Footer/>
    </div>
  </Router>,
 document.getElementById('app')
);

