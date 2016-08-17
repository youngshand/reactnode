import has from 'lodash/has';
import forEach from 'lodash/forEach';
import React from 'react';

import { IndexRoute, Route, Redirect } from 'react-router';

import App from './app';

import HardCodedHome from './components/hardCodedHome';
import InfoHander, { snippets } from './components/infoHandler';

import HomeHandler from './components/homeHandler';
import PageHandler from './components/pageHandler';
import PostHandler from './components/postHandler';
import NotFoundHandler from './components/notFoundHandler';

/**
 * Set this to true if you want to use data that has been retrieved
 * from the api and saved to the initial state rather than the prototype
 * comonents.
 */
const USE_API = false;


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
 * Returns the routes using the path index.
 * The routes are built using the path index which gets added to the initial state.
 */
function getRoutes(initialState) {
  const routes = [];
  const paths = initialState.paths;

  try {
    if (!USE_API) {
      // paths will not exist if the frontend is not connected up with the api.
      // this is most likely to occur when a project starts and it is in it's teething phase.
      routes.push(<IndexRoute key={'hard-coded-home'} component={HardCodedHome} />);

      // create routes for info pages
      forEach(snippets, (s, k) => routes.push(<Route path={k} key="k" component={InfoHander} />));
    } else {

      forEach(paths, (config, path) => {

        if (path === '/') {
          const handler = has(resources, config.type) ? resources[config.type].handler : resources.page.handler;
          routes.push(<IndexRoute key={path} component={handler} />);
        } else if (has(config, 'redirect')) {
          // redirect to the redirect setting
          routes.push(<Redirect key={path} from={path} to={config.redirect} />);
        } else {
          // default to the page handler if no type is given
          const handler = has(resources, config.type) ? resources[config.type].handler : resources.page.handler;

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
