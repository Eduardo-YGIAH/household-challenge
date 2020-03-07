var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var householdSchema = new Schema({
  title: String,
  author: String,
  date: { type: Date, default: Date.now },
});

module.exports = Household = mongoose.model('Household', householdSchema);
