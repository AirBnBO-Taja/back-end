const db = require("../data/db-config");

module.exports = {
  getListings,
  getListingById,
  addListing,
  updateListing,
  removeListing,
};

function getListings() {
  return db("listings");
}

function getListingById(id) {
  return db("listings").where({ id }).first();
}

function addListing(data) {
  return db("listings").insert(data);
}

function updateListing(id, data) {
  return db("listings").where({ id }).update(data);
}

function removeListing(id) {
  return db("listings").where({ id }).del();
}
