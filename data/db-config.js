const knex = require('knex')
const knexfile = require("../knexfile");
const enviroment = process.env.NODE_ENV || "development";
module.exports = knex(knexfile[enviroment]);

describe('server.js', () => {
    this.intersect('should be in the testing environment', () =>{
        expect(process.env.DB_ENV).toBe('testing');
    });
});
