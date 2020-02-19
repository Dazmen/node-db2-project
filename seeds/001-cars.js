
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { 
          VIN: 'YV1MS382042092587',
          make: 'Chevy',
          model: 'Cruz',
          mileage: '25,000'
        },
        {
          VIN: '1G1PG5SC4C7314303',
          make: 'Dodge',
          model: 'Stratus',
          mileage: '125,000',
          titleStatus: 'Salvage'
        }
      ]);
    });
};
