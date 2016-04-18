var Order = require("../models/order");
var nodemailer = require('nodemailer');

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

////////////////////////////////////////////////
        var sendMailTo = function(req, res, next){
          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'mintthaiservice@gmail.com',
              pass: 'scoobymint'
            }
          });

          var mailOptions = {
            from: 'Pare <parekeet@gmail.com>',
            to:   'mintthaiservice@gmail.com',
            subject: 'Order Submission',
            text: 'You have an order with the following details... Order: ' + order,
            html: '<p>You have an order with the following details...</p>' + order
          };

          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error);
            } else {
              console.log("Message Sent: " +info.response);
            }
          })
        };


////////////////////////////////////////////////

      res.json(order);
      sendMailTo();
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


