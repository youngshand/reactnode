import React from 'react';

import { IndexRoute, Route } from 'react-router';

import App from './app';
import HomeHandler from './components/homeHandler';
import NotFoundHandler from './components/notFoundHandler';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomeHandler} />
		<Route path="*" component={NotFoundHandler}/>
	</Route>
);
