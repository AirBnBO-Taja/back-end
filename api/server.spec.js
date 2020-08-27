const supertest = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

describe("server.js", () => {
    it("should be testing env", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });