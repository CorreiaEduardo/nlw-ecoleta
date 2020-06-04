import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('point_item', (table) => {
    table.increments('id').primary();
    table.integer('point_id').unsigned();
    table.integer('item_id').unsigned();
    table.foreign('point_id').references('point.id');
    table.foreign('item_id').references('item.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_item');
}
