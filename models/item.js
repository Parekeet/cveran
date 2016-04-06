var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var itemSchema = new mongoose.Schema({
  category: String,
  name:     String,
  amount: String,
  description: String,
  cost: Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;

