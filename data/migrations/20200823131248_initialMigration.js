exports.up = async function(knex) {
    await knex.schema.createTable("users", function(table) {
        table.increments('id');
        table.string("name", 128).notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
}; 