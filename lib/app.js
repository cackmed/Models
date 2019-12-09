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

app.post('/hello', (req, res) => {
  res.send(req.body);
});
//app.put('/', (req, res) => {
//  res.send({ text: 'hello' });
//});

//app.delete();

module.exports = app;

