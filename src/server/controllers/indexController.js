import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../client/reducers';
// import getHead from '../../client/head';
import { match, RouterContext } from 'react-router';
import { createMemoryHistory } from 'history';
import { ENV, DEV_PORT } from '../config';
import initialState from '../initialState';
import routes from '../../client/routes';
import getStackTrace from '../../client/utils/getStackTrace';


export default async (req, res) => {

  const host = req.hostname;
  const location = createMemoryHistory().createLocation(req.url);
  const ngrok = _.includes(host, 'ngrok');

  match({ routes, location }, (error, redirectLocation, renderProps) => {

    try{

      initialState.location = location;

      if (error) {

        res.status(500).send(error.message);

      } else if (redirectLocation) {

        res.redirect(302, redirectLocation.pathname + redirectLocation.search);

      } else if (renderProps) {

        let headContent = { meta: [] };

        // try {
        //  headContent = getHead(location.pathname, initialState);
        // } catch (e) { console.log(e.toString()) }

        const store = createStore(reducer, initialState);



          const favicon = initialState.settings.favicon ? initialState.settings.favicon.url : '';

          const content = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          res.status(200).render('index', {
            host, headContent, content, initialState, ngrok, DEV_PORT, ENV, favicon
          });

      } else {
        res.status(404).send('Not found');
      }
    } catch (e) {

      console.log('SERVER RENDERING ERROR');
      console.trace(e);

      const error = {
        status: 500,
        message: e,
        stack: getStackTrace()
      }

      res.status(500).render('error', {error});
    }

  });

};
