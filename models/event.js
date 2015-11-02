let mongoose = require('mongoose');
let Schema    = mongoose.Schema;
let eventSchema = new mongoose.Schema({

  name: String,
  location: String,
  date: String,
  dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }]

});


module.exports = mongoose.model('Event', eventSchema);
