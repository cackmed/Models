const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const Dog = require('../lib/models/Dog');
require('../lib/utils/connect')();


describe('testing curd routes', () => {
  
  beforeAll(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
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
          _id: expect.any(String),
          __v: 0,
          name: 'Leo',
          age: 3,
          weight: '75'
        });
      });
  });

  it('has a /hello post route', () => {
    return request(app)
      .post('/hello')
      .send({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
});
