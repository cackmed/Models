const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  yearMade: {
    type: Number,
    required: true,
    min: 1968,
    max: 2019
  }
});

module.exports = mongoose.model('Toy', schema);

