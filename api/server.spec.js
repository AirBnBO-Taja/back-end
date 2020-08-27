const supertest = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

describe("server.js", () => {
  it("should be testing env", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Server up and running", () => {
  it('the server returns 200 status', async () =>{
    const res = await supertest(server).get('/');
    expect(res.status).toBe(200)
  })
})

describe('Testing user register endpoint', () => {
  it('Should register a new user successfully', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      name: 'testguy',
      email: 'testguy@gmail.com',
      password: 'testpass',
    })
    console.log(res)
    expect(res.status).toBe(200)
  })
})

