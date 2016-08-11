import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import reducer from '../../shared/reducers';
import getHead from '../../shared/head';
import { match, RouterContext } from 'react-router';
import { createMemoryHistory } from 'history';
import { ENV, DEV_PORT } from '../config';
import InitialStateIndex from '../initialState';
import debugCache from '../debug';
import getRoutes from '../../shared/routes';
import getStackTrace from '../../shared/utils/getStackTrace';


export default async (req, res) => {
	const host = req.hostname;
  const location = createMemoryHistory().createLocation(req.url);
	const initialStateIndex = new InitialStateIndex('initialState');
	const ngrok = _.includes(host, 'ngrok');

	const initialState = await initialStateIndex.get();

	match({ routes: getRoutes(initialState), location }, (error, redirectLocation, renderProps) => {
    initialState.location = location;

		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			let headContent = { meta: [] };

			try {
				headContent = getHead(location.pathname, initialState);
			} catch (e) { console.log(e.toString()) }

			const store = createStore(reducer, Immutable.fromJS(initialState));
      const favicon = initialState.settings.favicon ? initialState.settings.favicon.url : '';

			try {
        console.log('RENDERING');
				const content = ReactDOMServer.renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>
				);
        console.log('RENDERED');

				res.status(200).render('index', {
					host, headContent, content, initialState, ngrok, DEV_PORT, ENV, favicon
				});
			} catch (e) {

        console.log('TRACE');
        console.trace(e);
        // console.trace('Error in Index Controller. This probably means you haven\'t handled it properly somewhere else');

        debugCache.save('Failed to complete server side react rendering', e.toString());

        const error = {
          status: 500,
          message: e,
          stack: getStackTrace()
        }

        res.status(500).render('error', {error});
			}

		} else {
			res.status(404).send('Not found');
		}
	});

};
