import _ from 'lodash';
import React from 'react';

import { IndexRoute, Route, Redirect } from 'react-router';

import App from './app';
import HomeHandler from './components/homeHandler';
import PageHandler from './components/pageHandler';
import PostHandler from './components/postHandler';
import NotFoundHandler from './components/notFoundHandler';

const resources = {
  home: {
    handler: HomeHandler
  },
  page: {
    handler: PageHandler
  },
  post: {
    handler: PostHandler
  }
};

/**
 * Returns the routes using the path index
 */
function getRoutes(initialState) {
  const routes = [];
  const paths = initialState.paths;

  try {
    if (paths) {
      // const env = initialState.env;

      _.forEach(paths, (config, path) => {

        if (path === '/') {
          const handler = _.has(resources, config.type) ? resources[config.type].handler : resources.page.handler;
          routes.push(<IndexRoute key={path} component={handler} />);
        } else if (_.has(config, 'redirect')) {
          // redirect to the redirect setting
          routes.push(<Redirect key={path} from={path} to={config.redirect} />);
        } else {
          // default to the page handler if no type is given
          const handler = _.has(resources, config.type) ? resources[config.type].handler : resources.page.handler;

          routes.push(
            <Route key={path}
              path={path}
              component={handler} />
          );
        }
      });
    }
  } catch (e) { console.error(e); }

  /**
   * Put your routes in here, remember to import the relevant component above!
   */
  return (
    <Route path="/" component={App}>
      {routes}
      <Route path="*" component={NotFoundHandler} />
    </Route>
  );
}

export default getRoutes;
