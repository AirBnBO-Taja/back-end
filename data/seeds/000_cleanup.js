
exports.seed = async function(knex) {
  await knex('listings').truncate()
  await knex('properties').truncate()
  await knex('users').truncate()
}
