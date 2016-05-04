export default {
  database: {
    url: 'postgres://ubuntu:@127.0.0.1:5432/circle_test',
    options: {
      logging: console.log,
      dialect: 'postgres',
    },
  },
  port: 1337,
};
