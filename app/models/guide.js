var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuideSchema = new Schema({
  "type": {
    "type": String,
    "default": "guide"
  },
  "attributes": {
    "title": String,
    "body": String,
    "tags": [String],
    "created": Date,
    "updated": Date,
    "isPrivate": Boolean,
    "isPublic": Boolean
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

module.exports = mongoose.model('Guide', GuideSchema);
