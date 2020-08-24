
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'John', email: 'john@gmail.com', password: 12345},
        {id: 2, name: 'Bob', email: 'bob@gmail.com', password: 12345},
        {id: 3, name: 'Sam', email: 'sam@gmail.com', password: 12345},
      ]);
    });
};
