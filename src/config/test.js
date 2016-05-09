export default {
  database: {
    url: `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@127.0.0.1:5432/test`,
    options: {
      logging: console.log,
      dialect: 'postgres',
    },
  },
  port: 1337,
};
