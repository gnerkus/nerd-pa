export default {
  database: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false,
      dialect: 'postgres',
    },
  },
  port: process.env.PORT,
  host: 'http://mottr-client-staging.herokuapp.com',
};
