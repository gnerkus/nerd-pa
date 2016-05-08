import config from 'config';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const DB = {};

const SEQUELIZE = new Sequelize(config.database.url, config.database.options);

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const MODEL = SEQUELIZE.import(path.join(__dirname, file));
    DB[MODEL.name] = MODEL;
  });

Object.keys(DB).forEach((modelName) => {
  if ('associate' in DB[modelName]) {
    DB[modelName].associate(DB);
  }
});

DB.SEQUELIZE = SEQUELIZE;
DB.Sequelize = Sequelize;

export default DB;
