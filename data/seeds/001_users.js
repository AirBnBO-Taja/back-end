
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'John', email: 'john@gmail.com', password: '$2a$04$9Aszx5s0BfaIc8RUP8e3Wef2.liatMlfOPJLi0QO/tjOsERxargdu'},
        {id: 2, name: 'Bob', email: 'bob@gmail.com', password: '$2a$04$9Aszx5s0BfaIc8RUP8e3Wef2.liatMlfOPJLi0QO/tjOsERxargdu'},
        {id: 3, name: 'Sam', email: 'sam@gmail.com', password: '$2a$04$NFR6XkBH/Ng42o9FctrfSOVEGJkQMuhnp6U0q0jdD9KGhv3dpPvFG'},
      ]);
    });
};
