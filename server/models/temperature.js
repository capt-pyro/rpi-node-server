var mongoose = require('mongoose');
var Temp = mongoose.model('Temp', {
  temperature: {
    type: Number,
    required: true
  },
  sentAt: {
    type: Number,
    default: null
  },
  humidity: {
    type: Number,
    required: true
  }
});

module.exports = {Temp};
