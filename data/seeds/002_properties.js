
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('properties').del()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert([
        {id: 1, street_address: '123 Main St.', city: 'Calrsbad', zip: '92011', bedrooms: 3, beds: 4, guests_included: 4, minumum_nights: 2, maximum_nights: 7, bathrooms: 3, accomodates: 6},
        {id: 2, street_address: '456 Baker St.', city: 'Del Mar', zip: '92014', bedrooms: 2, beds: 2, guests_included: 3, minumum_nights: 3, maximum_nights: 5, bathrooms: 2, accomodates: 4}
        // {id: 1, street_address: '123 Main St.', city: 'Calrsbad', zip: '92011', property_type: 'Single Family Home', leaseable_area:'1,200', parking:'2', bedrooms:'2', bathrooms:'1', upgrades:'', special_remarks:'' },
        // {id: 2, street_address: '456 Baker St.', city: 'Del Mar', zip: '92014', property_type: 'Single Family Home', leaseable_area:'1,600', parking:'2', bedrooms:'3', bathrooms:'2', upgrades:'', special_remarks:'' },
      ]);
    });
};