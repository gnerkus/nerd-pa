import config from './../config';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const DB = {};

const OPTIONS = {
  logging: false,
  dialect: 'postgres',
};

const SEQUELIZE = new Sequelize(config.database.url, OPTIONS);

fs.readdir(__dirname, (error, files) => {
  if (error) throw error;

  files.filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
      const MODEL = SEQUELIZE.import(path.join(__dirname, file));
      if (Array.isArray(MODEL)) {
        MODEL.forEach((table) => (DB[table.name] = table));
      } else {
        DB[MODEL.name] = MODEL;
      }
    });
});

Object.keys(DB).forEach((modelName) => {
  if ('associate' in DB[modelName]) {
    DB[modelName].associate(DB);
  }
});

DB.SEQUELIZE = SEQUELIZE;
DB.Sequelize = Sequelize;

export default DB;
