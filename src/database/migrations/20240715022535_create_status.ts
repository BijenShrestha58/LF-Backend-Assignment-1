import { Knex } from "knex";

const TABLE_NAME = "status";

/**
 * Create table status.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id");

    table.string("name", 100).notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

/**
 * Drop table status.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
