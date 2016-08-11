import React from 'react';
import { Router, browserHistory } from 'react-router';
import Immutable from 'immutable';
import getRoutes from '../shared/routes';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import Cookies from 'cookies-js';
import 'babel-polyfill';
import { pageView } from '../shared/utils/dataLayer';

Cookies.defaults = {
  path: '/'
};

// Use the browser history to listen for page directs
// This will then fire a Virtual PageView found in dataLayer.js
browserHistory.listen(function(ev) {
  pageView(ev.pathname);
});


import reducer from '../shared/reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

// Create Redux store with initial state
const logger = createLogger();
const store = createStore(reducer, Immutable.fromJS(initialState), applyMiddleware(logger));

render((
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={getRoutes(initialState)} />
  </Provider>
), document.getElementById('app'));
