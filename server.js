require('dotenv').config();
const app = require('./lib/app');

app.listen('8000', () => {
  console.log('started');
});
