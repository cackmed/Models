require('./utils/connect')();
const express = require('express');
const app = express();

const Dog = require('./models/Dog');


app.use(express.json());

app.get('/dogs/:dogId', (req, res) => {
  Dog.findbyId(req.params.dogId)
    .then(foundDog => {
      res.send(foundDog);
    });
});
app.get('/dogs/', (req, res) => {
  Dog.find()
    .then(foundDog => {
      res.send(foundDog);
    });
});

app.post('/dogs', (req, res) => {
  Dog.create({
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight
  })
    .then(createdDog => {
      res.send(createdDog);
      console.log('dog created');
    });
});

app.put('/dogs/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updateDog => {
      res.send(updateDog);
    });
});

app.delete('/dogs/:id', (req, res) => {
  Dog.findByIdAndDelete(req.params.id)
    .then(deleteDog => {
      res.send(deleteDog);
    });
});
module.exports = app;
