exports.up = async function(knex) {
  return await knex.schema.createTable(
    "puzzles", (table) => {
        table.increments("id").primary();
        table.string("White").default("solver");
        table.string("Black").default("");
        table.text("Moves").notNullable();
        table.string("FEN").notNullable();
    }
  )
};


exports.down = async function(knex) {
  return await knex.schema.dropTable("puzzles");
};
