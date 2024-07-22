import { Knex } from "knex";

const TABLE_NAME = "tasks";

/**
 * Create table tasks.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id");

    table.string("name", 100).notNullable();

    table.bigInteger("statusId").notNullable();

    table.bigInteger("userId").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("statusId")
      .references("id")
      .inTable("status")
      .onDelete("CASCADE");
  });
}

/**
 * Drop table tasks.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
