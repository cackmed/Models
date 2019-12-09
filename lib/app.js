require('./utils/connect')();
const Dog = require('./lib/models/Dog');
const express = require('express');
const app = express();


app.use(express.json());

app.get('/dog/:id', (req, res) => {
  Dog.findbyId(req.params.id)
    .then(foundDog => {
      res.send(foundDog);
    });
});
app.get('/dog/', (req, res) => {
  Dog.find()
    .then(foundDog => {
      res.send(foundDog);
    });

app.post('/dog', (req, res) => {
  Dog.create({
      name: 'hello',
      age: chance.integer(),
      weight: chance.string()
    })
     .then(createdDog => {
       res.send(createdDog)
       console.log('dog created');
     })
});
app.put('/dog/:id', (req, res) => {
  Dog.findByIdAndUpdate(eq.params.id, req.body, { new: true})
    .then(updateDog => {
      res.send(updateDog);
    })
});

//app.delete();

module.exports = app;

