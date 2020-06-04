import path from 'path';

module.exports = {
  client: process.env.KNEX_CLIENT,
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
};
