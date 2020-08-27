const supertest = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db("properties").truncate();
})

describe("Testing Environment and Server Status", () => {
  it("Should be in a testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
  it('the server returns 200 status', async () =>{
    const res = await supertest(server).get('/');
    expect(res.status).toBe(200)
    expect(res.type).toEqual('application/json')
  })
});

describe('Testing user endpoints', () => {
  beforeAll(async () => {
    await db("users").truncate();
  });
  it('Should register a new user successfully', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      name: 'testguy',
      email: 'testguy@gmail.com',
      password: 'testpass',
    })
    expect(res.status).toBe(201)
  })
  it('Should login a user successfully', async () => {
    const res = await supertest(server).post('/api/auth/login').send({
      email: 'testguy@gmail.com',
      password: 'testpass',
    })
    expect(res.status).toBe(200)
  })
})

describe('Properties CRUD', () => {
  it('Should POST properties successfuly', async () => {
    let token;
    let testCredentials = { email: 'testguy@gmail.com', password: 'testpass' }
    const testLogin = await supertest(server)
      .post('/api/auth/login')
      .send(testCredentials)
    const res = await supertest(server)
      .post('/api/properties')
      .set('Authorization', testLogin.body.token)
      .send({        
        street_address: '1 Testing St.', 
        city: 'Test City', 
        zip: '12345', 
        bedrooms: '1', 
        beds: '1', 
        guests_included: '1', 
        minumum_nights: '1', 
        maximum_nights: '1', 
        bathrooms: '1',
        accomodates: '1'
      })
    const properties = await db('properties')
    expect(res.status).toBe(200)
    expect(properties).toHaveLength(1)
  })

  it('Should GET properties successfuly', async () => {
    let token;
    let testCredentials = { email: 'testguy@gmail.com', password: 'testpass' }
    const testLogin = await supertest(server)
      .post('/api/auth/login')
      .send(testCredentials)
    const res = await supertest(server)
      .get('/api/properties')
      .set('Authorization', testLogin.body.token)
    expect(res.status).toBe(200)
  })

  it('Should PUT properties successfuly', async () => {
    let token;
    let testCredentials = { email: 'testguy@gmail.com', password: 'testpass' }
    const testLogin = await supertest(server)
      .post('/api/auth/login')
      .send(testCredentials)
    const res = await supertest(server)
      .put('/api/properties/1')
      .set('Authorization', testLogin.body.token)
      .send({        
        street_address: '2 Testing St.',
      })
    const properties = await db('properties')
    expect(res.status).toBe(200)
    expect(properties[0].street_address).toBe('2 Testing St.')
  })

  it('Should DELETE properties successfuly', async () => {
    let token;
    let testCredentials = { email: 'testguy@gmail.com', password: 'testpass' }
    const testLogin = await supertest(server)
      .post('/api/auth/login')
      .send(testCredentials)
    const res = await supertest(server)
      .delete('/api/properties/1')
      .set('Authorization', testLogin.body.token)
    const properties = await db('properties')
    expect(res.status).toBe(200)
    expect(properties).toHaveLength(0)
  })
})



// beforeAll((done) => {
//   supertest(server)
//     .post("/api/auth/login")
//     .send(testLogin)
//     .end((err, response) => {
//       token = response.body.token;
//       done();
//     });
// });