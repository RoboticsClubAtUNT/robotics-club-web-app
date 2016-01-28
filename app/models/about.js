var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = new Schema({
  "type": {
    "type": String,
    "default": "about"
  },
  "attributes": {
    "body": String,
    "created": Date,
    "updated": Date
  }
});

module.exports = mongoose.model('About', AboutSchema);
