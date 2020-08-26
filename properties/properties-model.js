const db = require("../data/dbConfig.js");

module.exports = {
  getProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  removeProperty,
};

function getProperties() {
  return db("properties");
}

function getPropertyById(id) {
  return db("properties").where({ id }).first();
}

function addProperty(data) {
  return db("properties").insert(data);
}

function updateProperty(id, data) {
  return db("properties").where({ id }).update(data);
}

function removeProperty(id) {
  return db("properties").where({ id }).del();
}
