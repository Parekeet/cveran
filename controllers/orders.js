var Order = require("../models/order");

module.exports = {
  index: index,
  create: create
};

function index(req, res, next) {
  Order.find({user: req.decoded._id, pending: true})
    .then(function(orders) {
      res.json(orders);
    })
    .catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
}

function create(req, res, next) {

console.log('req.decoded._id', req.decoded._id)
console.log('req.body', req.body)

  var order = new Order(req.body);
  order.user = req.decoded._id;
  order.save()
    .then(function(order) {
      // send email to user
      // communicate order to e24
      res.json(order);
    })
    .catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
}


