// @flow
/**
 * Node module imports
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import includes from 'lodash/includes';

/**
 * File imports
 */

import reducer from '../../client/reducers';
// import getHead from '../../client/head';
import { ENV, DEV_PORT } from '../../config/config';
import initialState from '../initialState';
import routes from '../../client/routes';
import getStackTrace from '../../client/utils/getStackTrace';

export default async (req: Object, res: Object) => {

	const host = req.hostname;
	const ngrok = includes(host, 'ngrok');

	/**
	 * The match function is supplied by React Router to handle route matching
	 * In this file we match the url, and if it's a valid link, we create a rendered string
	 * and wrap it in the redux store
	 */

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

		try{

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
