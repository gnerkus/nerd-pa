// The 'app-module-path' module sets a base directory for subsequent module
// imports. For example, instead of require(./../models) from the express file,
// we can use require('models') which resolves to require('./../models');
require('app-module-path').addPath(__dirname);
require('babel-polyfill');

const debug = require('debug')('mottr');
// We cannot use the import statement here because it will be hoisted above the
// 'app-module-path' module
const APP = require('config/express').APP;
const MODELS = require('models').default;

(async function () {
  try {
    await MODELS.SEQUELIZE.sync();
  } catch (err) {
    console.log(`An error occured when syncing the models: ${err}`);
  }

  APP.listen(APP.get('port'), () => {
    debug(`Express server listening on port ${APP.get('port')}`);
  });
})();
