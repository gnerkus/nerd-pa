export default {
  database: {
    url: process.env.DATABASE_URL,
    options: {
      logging: false,
      dialect: 'postgres',
    },
  },
};
