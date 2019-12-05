const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    required: true,
    min: 0
  },
  desc: {
    type: String,
    required: true
  },
});
module.exports = mongoose.schema('inventoryItem', schema);
