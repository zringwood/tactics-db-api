const puzzles = require('../data/tentactics.json')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('puzzles').delete()
  await knex("puzzles").insert(puzzles);
  
  
};