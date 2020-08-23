exports.up = async function(knex) {
    await knex.schema.createTable("users", function(users) {
        users.increments();
        users.string("name", 128).notNullable();
        users.string("email").notNullable().unique();
        users.string("password").notNullable();
    });

    await knex.schema.createTable('properties', function(properties) {
        properties.increments();
        properties.string("street_address", 128).notNullable();
        properties.string("city").notNullable();
        properties.string("zip").notNullable();
        properties.string("property_type").notNullable();
        properties.string("leaseable_area").notNullable();
        properties.string("parking").notNullable();
        properties.string("bedrooms").notNullable();
        properties.string("bathrooms").notNullable();
        properties.string("upgrades")
        properties.string("special_remarks")
    })

    await knex.schema.createTable('listings', function(listings) {
        listings.increments();
        listings.string("lease_rate").notNullable();
        listings.string("lease_term").notNullable();
        listings.string("restrictions").notNullable();
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("listings");
    await knex.schema.dropTableIfExists("propeties");
    await knex.schema.dropTableIfExists("users");
};