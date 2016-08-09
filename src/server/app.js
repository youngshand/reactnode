import _ from 'lodash';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes/index';
import api from './routes/api';
import request from 'superagent';
import { ENV } from './config';

// import { statusCodeCache } from './cache';

const app = express();

// set the env to local if it is not defined in NODE_ENV
if (!process.env.NODE_ENV) {
  app.set('env', 'local');
}

// add local constants to the app
app.locals.PORT = process.env.PORT || 3001;
app.locals.DEV_PORT = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, '/../../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// app.use(bodyParser.urlencoded({ extended: false }));
// TODO: treat all requests as json, fix this later
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../../dist')));

/**
 * For ngrok websites we need to pipe the app.js from the develop server
 */
if (ENV === 'local') {
  app.get('/js/app.js', (req, res) => {
    request.get('http://localhost:8081/js/app.js').pipe(res);
  });
}

// add routes to the app
// this is where we plugin the main parts of the application
app.use('/api', api);
app.use('/', routes);

// catch all 404 and forward to error handler
app.use((req, res) => {
  const err = new Error('Not Found');
  err.status = 404;

  if (_.includes(req.get('Content-Type'), 'application/json')) {
    // for json requests pass back 404 object which the app can handle correctly
    res.status(404).json({
      status: 404,
      next: '/404'
    });
  } else {
    if (app.get('env') === 'local' || false) {
      // if local give detailed error stack dump
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      // if non local redirect to 404 page
      res.status(404).redirect('/404');
    }
  }
});

export default app;