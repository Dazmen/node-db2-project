
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('carId');
        tbl.string('VIN').notNullable().index();
        tbl.string('make').notNullable().index();
        tbl.string('model').notNullable().index();
        tbl.string('mileage').notNullable();

        tbl.string('transmission');
        tbl.string('titleStatus');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
