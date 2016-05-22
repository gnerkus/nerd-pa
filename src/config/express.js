import config from 'config/index';
import models from 'models';
import routes from 'routes';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const APP = express();
const CORS_OPTIONS = {
  origin: config.host || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

// App-wide variables
APP.set('port', config.port || 1337);

// Application middleware
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
  extended: true,
}));

// Enable CORS
APP.use(cors(CORS_OPTIONS));

// Define routes for the application
routes(APP);

export { APP };
