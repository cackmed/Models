require('./utils/connect')();

const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send({ text: 'hello' });
});

app.post('/hello', (req, res) => {
  res.send(req.body);
});
//app.put('/', (req, res) => {
//  res.send({ text: 'hello' });
//});

//app.delete();

module.exports = app;

