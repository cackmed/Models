require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const Dog = require('../lib/models/Dog');


describe('testing curd routes', () => {
  
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a dog on post', () => {
    return request(app)
      .post('/dogs')
      .send({ name: 'Leo', age: 3, weight: '75 ib' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Leo',
          age: 3,
          weight: '75 ib'
        });
      });
  });
  it('finds all dogs with GET', async() => {
    const dogs = await Dog.create([
      { name: 'Leo', age: 3, weight: '75 ib' },
      { name: 'Tiny', age: 12, weight: '30 ib' },
      { name: 'Elvis', age: 10, weight: '55 ib' }
    ]);

    return request(app)
      .get('/dogs')
      .then(res => {
        dogs.forEach(dog => {
          expect(res.body).toContainEqual({
            _id: dog._id.toString(),
            name: dog.name,
            age: dog.age,
            weight: dog.weight,
            __v: dog.__v
          });
        });
      });
  });
  it('has a get route that retrives a dog by id form database', async() => {
    const dog = await Dog.create({
      name: 'Leo',
      age: 3,
      weight: '75'
    });
    return request(app)
      .get(`/dog/${dog._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.toString(),
          name: dog.name,
          age: dog.age,
          weight: dog.weight,
          __v: 0,
        });
      });
  });
});
