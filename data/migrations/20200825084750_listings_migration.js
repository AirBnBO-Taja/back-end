
exports.up = async function(knex) {
    await knex.schema.createTable('listings', function(table) {
        table.increments('id');
        table.string("lease_rate").notNullable();
        table.string("lease_term").notNullable();
        table.string("restrictions").notNullable();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("listings");
};
