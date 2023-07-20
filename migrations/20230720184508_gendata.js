exports.up = async function(knex) {
    //Remove the table. Formatting is different for this next file. 
    await knex.schema.dropTable("puzzles");
    return await knex.schema.createTable(
      "puzzles", (table) => {
          table.increments("id").primary();
          table.string("solver").default("White");
          table.text("Moves").notNullable();
          table.string("FEN").notNullable();
      }
    )
  };
  
  
  exports.down = async function(knex) {
    return await knex.schema.dropTable("puzzles");
  };