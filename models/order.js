var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var itemSchema = new mongoose.Schema({
  category: String,
  name:     String,
  amount: String,
  description: String,
  cost: Number
});

var orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  items: [itemSchema],
  phoneNumber: String,
  total: Number,
  pending: {type: Boolean, default: true}
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;

