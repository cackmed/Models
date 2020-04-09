const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  scheduledTask: {
    type: Boolean,
    required: true,
  },
  lengthoftimescheduled: {
    type: Number,
    required: true,
    min: 0,
    max: 240
  }
});

module.exports = mongoose.model('Task', schema);

