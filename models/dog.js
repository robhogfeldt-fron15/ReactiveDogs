let mongoose = require('mongoose');
let dogSchema = new mongoose.Schema({
  name: String,
  age: String,
  merits: [String],
  image: String

});



module.exports = mongoose.model('Dog', dogSchema);
