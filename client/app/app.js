/*eslint-disable import/default */
import React from 'react';  
import { render } from 'react-dom';  
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configure from './store/configure';
import { Provider } from 'react-redux';  
import { fetchWords } from './actions/words.actions';

import './../sass/main.scss';

const store = configure();
const history = createBrowserHistory();


import Navbar from './components/navbar/navbar.component';
import Footer from './components/footer/footer.component';
import App from './components/app.component';
import About from './components/about/about.component';
import Home from './components/home/home.component';

render(  
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Footer/>
      </div>
    </Router>
  </Provider>,
 document.getElementById('app')
);

