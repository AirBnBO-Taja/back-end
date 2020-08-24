
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(function () {
      // Inserts seed entries
      return knex('listings').insert([
        {id: 1, lease_rate: '$700', lease_term: 'per day', restrictions: 'none known'},
        {id: 2, lease_rate: '$1000', lease_term: 'weekend', restrictions: 'none known'},
        {id: 3, lease_rate: '$1200', lease_term: 'weekend', restrictions: 'no pets'},
      ]);
    });
};
