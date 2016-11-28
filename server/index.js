/* eslint consistent-return:0 */
/**
 * Module dependencies.
 */

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./logger');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: 'server/.env' });

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', '✗');
  process.exit();
});

/**
 * Express configuration.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Route handlers.
 */
const apiHandlers = require('./api');

/**
 * API examples routes.
 */
app.get('/api', apiHandlers.getApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
