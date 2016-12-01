/**
 * Node Modules imports
 */

import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

/**
 * File imports
 */

import App from './app';

/**
 * Node doesn't understand what require.ensure is, so we need to polyfill
 */

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/**
 * React hot loader doesn't play nice either, polyfill that, too
 */

if (process.env.NODE_ENV !== 'production') {
  require('./pages/home');
  require('./pages/notFound');
}

/**
 * The structure for a site needs to follow a set pattern:
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/home').default);
        });
      }}
    />
    <Route
      path="/register"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/register').default);
        });
      }}
    />
    <Route
      path="/questions:quid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/question').default);
        });
      }}
    />
    <Route
      path="/fact:fuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/fact').default);
        });
      }}
    />
    <Route
      path="/success"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/success').default);
        });
      }}
    />
    <Route
      path="*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./pages/notFound').default);
        });
      }}
    />
  </Route>
);
