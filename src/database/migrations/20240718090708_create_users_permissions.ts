import { Knex } from "knex";

const TABLE_NAME = "users-permissions";

/**
 * Create table users-permissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id");

    table.bigInteger("userId").notNullable();

    table.bigInteger("permissionsId").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("permissionsId")
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE");
  });
}

/**
 * Drop table users-permissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
