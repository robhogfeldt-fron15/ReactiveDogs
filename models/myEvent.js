let mongoose = require('mongoose');


let dogs = new mongoose.Schema({
  name: String,
  age: String,
  image: String,
  merits: [String],
  results: {
    track: String,
    obedience: String,
    protection: String
  },

});

let MyEventsSchema = new mongoose.Schema({

  name: String,
  location: String,
  date: String,
  dogs: [dogs]

});


module.exports = mongoose.model('MyEvents', MyEventsSchema);
