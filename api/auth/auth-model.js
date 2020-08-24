const db = require("../../data/db-config");

const findById = (id) => {
  return db("users").where({ id }).first();
};

const findBy = (user) => {
  return db("users").where(user).first();
};

const add = async (user) => {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
};

module.exports = { add, findById, findBy };
