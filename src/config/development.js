require('dotenv').config();

export default {
  database: {
    url: process.env.DB_URL,
    options: {
      logging: console.log,
      dialect: 'postgres',
    },
  },
  port: 1337,
};
