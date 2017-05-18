import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configure from './store/configure';

import Home from './components/home/home.component';

import './../sass/main.scss';

const store = configure();

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app'),
);
