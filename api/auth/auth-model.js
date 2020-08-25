const db = require("../../data/db-config");

const findById = (id) => {
  return db("users").where({ id }).first();
};

function findBy(filter) {
	return db('users').select('id', 'name', 'email', 'password').where(filter)
}

const add = async (user) => {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
};

module.exports = { add, findById, findBy };
