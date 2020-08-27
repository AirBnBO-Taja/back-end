
exports.up = async function(knex) {
    await knex.schema.createTable('properties', function(table) {
        table.increments('id');
        table.string("street_address", 128).notNullable();
        table.string("city").notNullable();
        table.string("zip").notNullable();
        // table.string("property_type").notNullable();
        // table.string("leaseable_area").notNullable();
        // table.string("parking").notNullable();
        table.integer("bedrooms").notNullable();
        table.integer("beds").notNullable();
        table.integer("guests_included").notNullable();
        table.integer("minumum_nights").notNullable();
        table.integer("maximum_nights").notNullable();
        table.integer("bathrooms").notNullable();
        table.integer("accomodates").notNullable();
        // table.string("upgrades")
        // table.string("special_remarks")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("properties");
};
