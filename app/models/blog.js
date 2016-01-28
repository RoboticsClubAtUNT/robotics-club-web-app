var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  "type": {
    "type": String,
    "default": "blog"
  },
  "attributes": {
    "title": String,
    "body": String,
    "created": Date,
    "updated": Date,
  },
  "relationships": {
    "author": {
      "data": {
        "id": String,
        "name": String
      }
    }
  }

});

module.exports = mongoose.model('Blog', BlogSchema);
