var Item = require("../models/item");

var index = function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      res.send(err);
    }
    res.json(items);
  });
}

module.exports = {
  index: index
};
