var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  "type": {
    "type": String,
    "default": "post"
  },
  "attributes": {
    "title": String,
    "body": String,
    "kind": String,
    "created": Date,
    "updated": Date,
    "tags": String,
    "isPrivate": Boolean,
    "isPublished": Boolean
  },
  "links": {
    "first": String,
    "next": String,
    "self": String,
    "prev": String,
    "last": String,
    "related": String
  },
  "relationships": {
    "author": {
      "data": {
        "_type": String,
        "_id": String
      }
    }
  }
});

module.exports = mongoose.model('Post', PostSchema);
