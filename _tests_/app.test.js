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
      .send({ name: 'Leo', age: 3, weight: '75 ibs' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Leo',
          age: 3,
          weight: '75 ibs'
        });
      });
  });
  it('finds all dogs with GET', async() => {
    const dogs = await Dog.create([
      { name: 'Leo', age: 3, weight: '75 ibs' },
      { name: 'Tiny', age: 12, weight: '30 ibs' },
      { name: 'Elvis', age: 10, weight: '55 ibs' }
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
      weight: '75 ibs'
    });
    return request(app)
      .get(`/dogs/${dog._id}`)
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
  it('updates some Dog object with Put', async() => {
    const dog = await Dog.create({
      name: 'Leo',
      age: 3,
      weight: '75 ibs'
    });

    return request(app)
      .put(`/dogs/${dog._id}`)
      .send({ name: 'Spot' })
      .then(res => {
        expect(res.body).toEqual({
          _id: dog._id.toString(),
          name: 'Spot',
          age: 3,
          weight: '75 ibs',
          __v: dog.__v
        });
      });
  });

  it('can delete a Note with DELETE', async() => {
    const dog = await Dog.create({
      name: 'Leo',
      age: 3,
      weight: '75 ibs'
    });

    return request(app)
      .delete(`/dogs/${dog._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: dog._id.toString(),
          name: 'Leo',
          age: 3,
          weight: '75 ibs',
          __v: dog.__v
        });
      });
  });
});

