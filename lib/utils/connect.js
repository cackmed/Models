const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('We Connected');
  });

  mongoose.connection.on('error', () => {
    console.error('We cannot connect');
  });
}

module.exports = connect;
