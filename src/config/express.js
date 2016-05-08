import config from 'config/index';
import models from 'models';
import routes from 'routes';

import express from 'express';
import bodyParser from 'body-parser';

const APP = express();

// App-wide variables
APP.set('port', config.port || 1337);

// Application middleware
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({
  extended: true,
}));

// Define routes for the application
routes(APP);

export { APP };
