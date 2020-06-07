import knex from 'knex';

const connection = knex({
  client: process.env.KNEX_CLIENT,
  connection: process.env.CONNECTION_STRING,
});

export default connection;
