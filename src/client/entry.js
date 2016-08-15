// the babel polyfill makes new features like promises avaliable to frontend code
import 'babel-polyfill';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import getRoutes from '../shared/routes';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import Cookies from 'cookies-js';
import { pageView } from '../shared/utils/dataLayer';
import errorHandling from './errorHandling';
import reducer from '../shared/reducers';

window.onerror = errorHandling;

Cookies.defaults = {
  path: '/'
};

// Use the browser history to listen for page directs
// This will then fire a Virtual PageView found in dataLayer.js
browserHistory.listen((ev) => {
  pageView(ev.pathname);
});


// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

// Create Redux store with initial state
const logger = createLogger();
const store = createStore(reducer, initialState, applyMiddleware(logger));

render((
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={getRoutes(initialState)} />
  </Provider>
), document.getElementById('app'));
