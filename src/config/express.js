import config from './index';
import models from './../models';
import routes from './../routes';

import express from 'express';
import bodyParser from 'body-parser';

function start() {
  const APP = express();

  // App-wide variables
  APP.set('port', config.port || 1337);

  // Application middleware
  APP.use(bodyParser.json());
  APP.use(bodyParser.urlencoded({
    extended: true,
  }));

  // Sync sequelize models.
  models.SEQUELIZE.sync().then(() => {
    // Define routes for the application
    routes(APP);

    APP.listen(APP.get('port'), () => {

    });
  });
}

export default { start };
